import {Button, Descriptions, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {GetTask} from "../../../../../../interfaces/task";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import GetPageRecordNumber from "../../../../../../lib/getPageRecordNumber";
import CustomTable from "../../../../../../components/CustomeTable";
import {Steps} from "../../../../../../interfaces/steps";

export default function DataTable() {
  const [initialData, setInitialData] = useState<any>(GetPageRecordNumber());

  const {
    data: naft,
    isLoading,
    mutate,
    isValidating,
  } = useSWR<any>(
    ["/WorkFlowRequest/GetAllStep03", initialData],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url)
  );

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

  const renderDes = () => {

    try {
      const step: Steps | undefined = naft?.step ? naft?.step[0] : null

      return <>
        <Descriptions className="text-right" title={step?.Name}>
          <Descriptions.Item span={2} label="مرحله">
            {step?.Step_Name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="نقش">
            {step?.Roles_of_authorized_approvers}
          </Descriptions.Item>
          <Descriptions.Item span={5} label="متن کمکی">
            {step?.Help_Text}
          </Descriptions.Item>
        </Descriptions>
      </>

    } catch (e) {
      return <></>
    }

  }

  return (
      <>
        {renderDes()}
        <CustomTable
            setInitialData={setInitialData}
            data={{records: naft?.tasks, count: naft?.length || 0}}
            columns={columns}
            isLoading={isLoading || isValidating}
        />
      </>
  );
}
