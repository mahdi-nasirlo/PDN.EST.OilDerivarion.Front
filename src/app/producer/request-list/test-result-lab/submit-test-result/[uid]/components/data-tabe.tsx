import React, {useState} from "react";
import {Button, Divider, Form, Input, Select, Space, Table, Typography,} from "antd";
import StatusColumn from "../../../../../../../../components/CustomeTable/StatusColumn";
import DateForm from "./date-form";

interface Item {
  age: number;
  address: string;
  Uid: string;
  Measure_Id: number;
  ReNewabillity: number;
  ReNewabillity_Value: number;
  TestMethod: string;
  Name: string;
  IsActive: boolean;
  MeasureName: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: any;
  title: any;
  inputType: "object" | "string";
  record: Item;
  index: number;
  children: React.ReactNode;
  width?: string;
}

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
  const inputNode =
    inputType === "object" ? <Select /> : <Input defaultValue={record?.Name} />;

  const getObjectOptions = (dataIndex: string) => {
    switch (dataIndex) {
      case "testItemDetailUid":
        return <Select />;
        break;

      default:
        return <Select /> || <Input />;
    }
  };
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item className="m-0" name={dataIndex}>
          {inputType === "object" ? getObjectOptions(dataIndex) : inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function DataTable({
  labresult,
  ldlabresult,
  params,
  mutate,
}: {
  mutate: () => void;
  params: any;
  ldlabresult: any;
  labresult: any;
}) {
  {
    const [form] = Form.useForm();
    const [data, setData] = useState<Item | undefined>();
    const [editingUid, setEditingUid] = useState<any>();

    const isEditing = (record: Item) => record.Uid === editingUid;

    const edit = (record: { Uid: string }) => {
      form.setFieldsValue({ ...record });
      setEditingUid(record.Uid);
    };

    const cancel = () => {
      setEditingUid(null);
    };

    const save = async (values: any) => {
      values.Uid = editingUid;
      await console.log(values);
      await mutate();
      form.resetFields();
      setEditingUid(null);
    };

    const columns = [
      {
        title: "فاکتور آزمون",
        dataIndex: "Name",
        editable: true,
      },
      {
        title: "فعال/غیرفعال",
        dataIndex: "IsActive",
        editable: false,
        render: (record: any) => <StatusColumn record={record} />,
      },
      {
        title: "ReNewabillity",
        dataIndex: "ReNewabillity",
        editable: true,
      },
      {
        title: "ReNewabillity_Value",
        dataIndex: "ReNewabillity_Value",
        editable: true,
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
                onClick={() =>
                  form.validateFields().then((values) => save(values))
                }

                // onClick={() => {
                //   let NewDate = record;
                //   save(NewDate);
                // }}
              >
                ذخیره
              </button>
            </Space>
          ) : (
            <Button
              type="link"
              className="font-bold text-secondary-500"
              onClick={() => edit({ Uid: record.Uid })}
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
        onCell: (record: Item) => {
          return {
            record,
            inputType: tableColInputType[`${col.dataIndex}`],
            dataIndex: col.dataIndex,
            title: col.title,
            width: col.width,
            editing: isEditing(record),
            value: record.Name,
          };
        },
      };
    });

    return (
      <div className="box-border w-full mt-8 p-6">
        <Typography className="mt-3 mb-6 text-right font-medium text-base">
          لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
        </Typography>
        <Divider />

        <DateForm />
        <Divider />

        <div className="flex justify-between items-center mb-4">
          <Typography className="text-right text-[16px] font-normal">
            نتیجه آژمون{" "}
          </Typography>
        </div>
        <Form form={form} onFinish={save} component={false}>
          <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={labresult}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
          />
        </Form>
      </div>
    );
  }
}

interface TableColInputType {
  [key: string]: string
}

const tableColInputType: TableColInputType = {
  name: "string",
  ReNewabillity: "object",
  ReNewabillity_Value: "object",
};
