import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { GetTask } from "../../../../../../interfaces/task";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import GetPageRecordNumber from "../../../../../../lib/getPageRecordNumber";
import CustomTable from "../../../../../../components/CustomeTable";

export default function DataTable() {
  const router = useRouter();
  const { data, isLoading, mutate, isValidating } = useSWR<any>(
    ["/WorkFlowRequest/GetAllStep02"],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url)
  );
  const [initialData, setInitialData] = useState<any>(GetPageRecordNumber());

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
              router.push("/producer/task/detail/" + record.taskId);
            }}
          >
            مشاهده اطلاعات
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        setInitialData={setInitialData}
        data={{ records: data, count: data?.length || 0 }}
        columns={columns}
        loading={isLoading || isValidating}
      />
      {/* <Table
        loading={isLoading || isValidating}
        className="mt-6"
        columns={columns}
        dataSource={data}
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
      /> */}
    </>
  );
}
