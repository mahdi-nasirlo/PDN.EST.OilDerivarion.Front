import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Select, Space, Table, Tooltip, Typography, } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../../../lib/server/listFetcher";
import Item from "antd/es/list/Item";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../../../lib/server/mutationFetcher";
import useGetAllTestItemDetail from "../../../../../../../../hooks/testItemDetail/useGetAllTestItemDetail";

interface Item {
  TestItemUid: string;
  Measure_Id: number;
  TestMethod: string;
  Name: string;
  IsActive: boolean;
  MeasureName: string;
  Result: string;
  Range: string;
  Description: string;
  CreateDate: string;
  IsDeleted: boolean;
  ReNewabillity: string;
  ReNewabillityUnit: string;
  MinAcceptableResult: string;
  MaxAcceptableResult: string;
  TestItemDetailUid: object | string;
  TestItemDetailTitle: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

interface TestSelect {
  Uid: string;
  TestItemUid: string;
  Title: string;
  ReferenceCode: string;
  IsActive: boolean;
  TestItemName: string;
}

const DataTable = ({ uid }: { uid: string }) => {
  const [editingKey, setEditingKey] = useState("");

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const testItemDetail = useGetAllTestItemDetail(record?.TestItemUid);

    const inputNode =
      dataIndex === "TestItemDetailTitle" ? (
        <Select
          size="large"
          labelInValue
          options={testItemDetail.data || ([] as any)}
          fieldNames={{ label: "title", value: "uid" }}
          loading={testItemDetail.isLoading}
        />
      ) : (
        <Input />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const {
    isLoading: ldlabresult,
    data: labresult,
    mutate,
  } = useSWR<any>("/TestResult/GetAllByBarcode", (url, arg: string, any) =>
    listFetcher(url, {
      arg: {
        barcode: uid,
      },
    })
  );

  const { trigger, isMutating: LdTestResultCreate } = useSWRMutation(
    "/TestResult/Create",
    mutationFetcher
  );

  useEffect(() => {
    setData(labresult);
  }, [labresult]);

  const [form] = Form.useForm();
  const [data, setData] = useState(labresult);

  const isEditing = (record: Item) => record.TestItemUid === editingKey;

  const edit = (record: { TestItemUid: string }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.TestItemUid);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData: any = [...data];
      const index = newData.findIndex((item: any) => key === item.TestItemUid);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        newData[index].TestItemDetailUid =
          newData[index].TestItemDetailTitle?.key;

        newData[index].TestItemDetailTitle =
          newData[index].TestItemDetailTitle?.label;

        const res = await trigger({
          ...newData[index],
          requestBarcodeUid: uid,
        });

        if (res) {
          mutate();

          setData(newData);

          setEditingKey("");
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      key: "1",
      title: "فاکتور آزمون",
      dataIndex: "Name",
      editable: false,
    },
    // {
    //   title: "فعال/غیرفعال",
    //   dataIndex: "IsActive",
    //   editable: false,
    //   render: (record: any) => <StatusColumn record={record} />,
    // },
    {
      key: "2",
      title: "روش آزمون",
      dataIndex: "TestMethod",
      editable: false,
    },
    {
      key: "3",
      title: "واحد اندازه گیری",
      dataIndex: "MeasureName",
      editable: false,
    },
    {
      key: "5",
      title: "زمان ثبت",
      dataIndex: "CreateDate",
      editable: false,
    },
    {
      key: "6",
      title: "نتیجه آزمون",
      dataIndex: "Result",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 150 }}>{text}</div>
      ),
    },
    {
      key: "7",
      title: "محدوده",
      dataIndex: "Range",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 150 }}>{text}</div>
      ),
    },
    {
      key: "8",
      title: "توضیحات",
      dataIndex: "Description",
      editable: true,
      render: (text: string, record: Item, editable: boolean) => (
        <>
          {editable ? (
            <div style={{ width: 150 }}>{text}</div>
          ) : (
            <Tooltip
              placement="top"
              title={<Typography>{record.Description}</Typography>}
            >
              <Typography.Text
                className="max-w-[100px]"
                ellipsis={true}
                style={{ width: "40px !important" }}
              >
                {record.Description}
              </Typography.Text>
            </Tooltip>
          )}
        </>
      ),
    },

    {
      key: "9",
      title: "حداقل مقدار قابل قبول",
      dataIndex: "MinAcceptableResult",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 100 }}>{text}</div>
      ),
    },
    {
      key: "10",
      title: "حداکثر مقدار قابل قبول",
      dataIndex: "MaxAcceptableResult",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 100 }}>{text}</div>
      ),
    },
    {
      key: "11",
      title: "واحد تجدید پذیری",
      dataIndex: "ReNewabillity",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 150 }}>{text}</div>
      ),
    },
    {
      key: "12",
      title: "تجدید پذیری",
      dataIndex: "ReNewabillityUnit",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 150 }}>{text}</div>
      ),
    },
    {
      key: "13",
      title: "استانداردهای فاکتور آزمون",
      dataIndex: "TestItemDetailTitle",
      editable: true,
      render: (text: string, record: Item) => (
        <div style={{ width: 150 }}>{text}</div>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      width: "10%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="small">
            <button
              className="font-bold text-red-500 py-1 px-2"
              onClick={cancel}
            >
              انصراف
            </button>
            <button
              className="font-bold text-primary-500 py-1 px-2"
              onClick={() => save(record.TestItemUid)}
            >
              ذخیره
            </button>
          </Space>
        ) : (
          <Button
            type="link"
            className="font-bold text-secondary-500"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            ثبت نتیجه
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="box-border w-full mt-8 p-6">
      <Typography className="mt-3 mb-6 text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Divider />

      {/*<DateForm />*/}
      {/*<Divider />*/}

      <div className="flex justify-between items-center mb-4">
        <Typography className="text-right text-[16px] font-normal">
          نتیجه آزمون
        </Typography>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data || []}
          //@ts-ignore
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default DataTable;
