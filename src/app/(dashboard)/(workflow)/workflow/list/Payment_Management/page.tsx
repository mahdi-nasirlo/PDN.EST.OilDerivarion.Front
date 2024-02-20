"use client";

import React from "react";
import { ColumnsType } from "antd/es/table";
import { Space } from "antd/lib";
import useWorkflow from "@/components/workflow/workflow-data-list/hook/useWorkflow";
import Breadcrumb from "@/components/breadcrumb";
import WorkflowDataTable from "@/components/workflow/workflow-data-list";
import { Card } from "@/components/card";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Tag, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const Page = () => {

    const { data } = useWorkflow({ stepKey: "Payment_Management" });

    const extraColumns: ColumnsType = [
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "5",
            render: (_, record: any) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.status === 0) {
                    name = "در انتظار پرداخت هزینه بازدید";
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                } else if (record.status === 1) {
                    name = "در انتظار پرداخت هزینه آزمایش";
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                } else if (record.status === 2) {
                    name = "در انتظار پرداخت هزینه صدور کد رهگیری"
                    icon = <ClockCircleOutlined />
                    color = 'warning'
                } else {
                    name = "پرداخت شده"
                    color = 'success'
                    icon = <CheckCircleOutlined />
                }
                return (
                    <Tag className='p-1' icon={icon} color={color}>
                        {name}
                    </Tag>
                );
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
                    {record.status !== (0 | 1 | 2) ? <Link
                        type="link"
                        className={"text-primary-500 font-bold"}
                        href={record.status == 0 ? `/workflow/detail/${record.TaskId}/visit_invoice`
                            : record.status == 1 ? `/workflow/detail/${record.TaskId}/lab_invoice`
                                : `/workflow/detail/${record.TaskId}/product_code_Invoice`}
                    >
                        پرداخت
                    </Link> : <Typography
                        className={"text-gray-400 font-bold cursor-not-allowed"}
                    >
                        پرداخت شده
                    </Typography>
                    }
                </Space>
            )
        },
    ];

    return (
        <>
            {data?.step && (
                <Breadcrumb
                    pages={[{ label: "خانه", path: "/" }]}
                    currentPage={`${data?.step[0]?.Step_Name}`}
                    titleIcon={<ClipboardDocumentListIcon className="h-8" />}
                    backLink="/"
                />
            )}
            <Card>
                <WorkflowDataTable stepKey="Payment_Management" extraColumns={extraColumns} />
            </Card>
        </>
    );
};

export default Page;
