import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useRouter } from "next/navigation";
import { GetTask } from "../../../../../../interfaces/task";

export default function DataTable({
  isValidating,
  naft,
  isLoading,
  mutate,
}: {
  isValidating: any;
  naft: any;
  isLoading: any;
  mutate: () => void;
}) {
  const router = useRouter();

  const columns: ColumnsType<GetTask> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "توضیحات کاربر",
      dataIndex: "userDescription",
      key: "2",
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startTimePersian",
      key: "7",
    },
    {
      title: "تاریخ پایان",
      dataIndex: "currentStepStartTimePersian",
      key: "3",
    },

    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold "
            onClick={() => {
              router.push("/producer/expert-naft/detail/" + record.taskId);
            }}
          >
            مشاهده اطلاعات
          </Button>
        </Space>
      ),
    },
  ];
  {
  }
  return (
    <>
      <Table
        loading={isLoading || isValidating}
        className="mt-6"
        columns={columns}
        dataSource={naft}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ["10", "20", "50"],
          defaultCurrent: 1,
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: "16px 0",
          },
        }}
      />
    </>
  );
}
