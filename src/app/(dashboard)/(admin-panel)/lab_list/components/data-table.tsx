import React, { useState } from "react";
import { Card } from "@/components/card";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import StatusColumn from "@/components/custom-table/StatusColumn";
import { Button, Space, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { TestItemApi } from "constance/test-item";
import { z } from "zod";
import useTestItemDelete from "@/hooks/basic/test_item/use-test-item-delete";
import labApi from "constance/lab";
import EditModal from "./edit-modal";
import useLabDelete from "@/hooks/lab/use-lab-delete";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

const apiData = labApi.LabGetPage;
interface TProps {
  data: z.infer<typeof apiData.response.shape.data> | undefined;
  isLoading: boolean;
  setModalVisible: (arg: boolean) => void;
  setPaginate: (arg: any) => void;
}

export default function DataTable({
  setModalVisible,
  data,
  isLoading,
  setPaginate,
}: TProps) {
  const [uid, setGetUid] = useState<string | boolean>();
  const [uidDelete, setUidDelete] = useState<string | boolean>();

  const Delete = useLabDelete();

  const handelDelete = async () => {
    const res = await Delete.mutateAsync({ uid: uidDelete as string });

    if (res.success) {
      setUidDelete(undefined);
    }
  };

  const columns: ColumnsType<z.infer<typeof labApi.LabGetPage.Item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام آزمایشگاه",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شماره ثابت",
      dataIndex: "tel",
      key: "3",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "isActive",
      key: "4",
      render: (_, record: any) => <StatusColumn record={record} />,
    },
    {
      title: "استان",
      dataIndex: "stateName",
      key: "5",
    },
    {
      title: "آدرس",
      dataIndex: "address",
      key: "6",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={<Typography>{record.address}</Typography>}
        >
          <Typography.Text
            className=" max-w-[250px]"
            ellipsis={true}
            style={{ width: "45px !important" }}
          >
            {record.address}
          </Typography.Text>
        </Tooltip>
      ),
    },
    // {
    //   title: "موقعیت جغرافیایی",
    //   dataIndex: "test",
    //   key: "7",
    //   render: (_, record) => (
    //     <Space size="small">
    //       <Button
    //         type="link"
    //         className="text-primary-500 font-bold"
    //         onClick={() => handleGPS(record)}
    //       >
    //         مشاهده موقعیت
    //       </Button>
    //     </Space>
    //   ),
    // },
    {
      title: "فاکتورهای آزمون",
      dataIndex: "testItems",
      key: "4",
      render: (_, record) => {
        let testItemNames = record.testItems
          ?.map((item) => item.name)
          .join(", ");
        return (
          <Tooltip
            placement="top"
            title={<Typography>{testItemNames}</Typography>}
          >
            <Typography.Text
              className="max-w-[180px]"
              ellipsis={true}
              style={{ width: "40px !important" }}
            >
              {testItemNames}
            </Typography.Text>
          </Tooltip>
        );
      },
    },
    {
      title: "شماره مجوز",
      dataIndex: "license_No",
      key: "9",
    },
    {
      title: "تاریخ انقضاء",
      dataIndex: "licenseExpireDatePersian",
      key: "10",
    },
    {
      title: "فکس",
      dataIndex: "fax",
      key: "11",
    },
    // {
    //   title: "عملیات",
    //   key: "عملیات",
    //   align: "center",
    //   fixed: "right",
    //   width: "10%",
    //   render: (_, record) => (
    //     <Space size="small">
    //       <Button
    //         type="link"
    //         className="text-secondary-500 font-bold"
    //         onClick={() => handleEdit(record)}
    //       >
    //         ویرایش
    //       </Button>
    //       <Button
    //         type="link"
    //         className="text-secondary-500 font-bold"
    //         onClick={() => handleSetlocation(record)}
    //       >
    //         تعیین موقعیت آزمایشگاه
    //       </Button>
    //     </Space>
    //   ),
    // },
    {
      title: "جزئیات",
      key: "جزئیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => setGetUid(record.uid)}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => setUidDelete(record.uid)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className="mt-8">
        <CustomTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست آزمایشگاه ها",
            actions: [
              <Button
                key={"1"}
                className="max-md:w-full flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setModalVisible(true);
                }}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن آزمایشگاه</span>
              </Button>,
            ],
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={data}
          columns={columns}
        />
      </Card>
      <EditModal editModalUid={uid} setEditModalUid={setGetUid} />
      <ConfirmDeleteModal
        title="آزمایشگاه"
        open={uidDelete}
        setOpen={setUidDelete}
        handleDelete={handelDelete}
        loading={Delete.isPending}
      />
    </>
  );
}
