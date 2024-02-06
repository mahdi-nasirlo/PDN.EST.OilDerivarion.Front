"use client"

import React from 'react';
import {ColumnsType} from "antd/es/table";
import WorkFlowStatusColumn from "@/components/workflow/workflow-status-columns";
import {Space} from "antd/lib";
import VisitInfo from "@/components/workflow/visit-info";
import useWorkflow from "@/components/workflow/workflow-data-list/hook/useWorkflow";
import Breadcrumb from "@/components/breadcrumb";
import WorkflowDataTable from "@/components/workflow/workflow-data-list";
import {Card} from "@/components/card";
import {ClipboardDocumentListIcon} from "@heroicons/react/24/solid";
import {Button} from "antd";
import {useRouter} from "next/navigation";

const Page = ({params: {key}}: { params: { key: string } }) => {

    const {data} = useWorkflow({stepKey: key});

    const router = useRouter()

    const extraColumns: ColumnsType = [
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "5",
            render(_, record) {
                return <WorkFlowStatusColumn record={record}/>;
            },
        },

        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record: any) => (
                <Space size="small">
                    <VisitInfo
                        CanEdit={record.CanEdit}
                        href={`/workflow/detail/${key}/${record.TaskId}`}
                    >
                        مشاهده اطلاعات
                    </VisitInfo>
                </Space>
            ),
        },
    ];

    return (
        <>
            {data?.step && <Breadcrumb
                pages={[{label: "خانه"}]}
                currentPage={`${data?.step[0]?.Step_Name}`}
                titleIcon={<ClipboardDocumentListIcon className="h-8"/>}
                actions={[
                    <Button
                        key={1}
                        size="large"
                        onClick={() => router.back()}
                    >
                        بازگشت
                    </Button>
                ]}
            />}
            <Card>
                <WorkflowDataTable
                    stepKey={key}
                    extraColumns={extraColumns}
                />
            </Card>
        </>
    );
};

export default Page;