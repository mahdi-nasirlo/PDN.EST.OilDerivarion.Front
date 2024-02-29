"use client"

import { Card } from '@/components/card';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { DocumentChartBarIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import Breadcrumb from '@/components/breadcrumb'
import CustomTable from '@/components/custom-table'
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { z } from 'zod';
import usePaymentList from '@/hooks/request-package/use-payment-list';
import { RequestPackageApi } from 'constance/request-package';

interface PropType {
    params: { TaskId: string };
}

export default function Page(props: PropType) {

    const PaymentList = usePaymentList({ package_UID: props.params.TaskId })

    const columns: ColumnsType<z.infer<typeof RequestPackageApi.PaymentList.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%",
        },
        {
            title: "عنوان پرداخت",
            dataIndex: "StepName",
            key: "2",
            render: (_, record: any) => {
                let name = "";
                if (record.StepName === 1) {
                    name = "در انتظار پرداخت هزینه بازدید";
                } else if (record.StepName === 2) {
                    name = "در انتظار پرداخت هزینه پست";
                } else if (record.StepName === 3) {
                    name = "در انتظار پرداخت هزینه آزمایش"
                } else {
                    name = "در انتظار پرداخت هزینه صدور کد رهگیری"
                }
                return (
                    <Typography>
                        {name}
                    </Typography>
                );
            },
        },
        {
            title: "زمان ایجاد فاکتور",
            dataIndex: "Create_DT",
            align: "center",
            key: "5",
            render: (_, record) => {
                if (record.Create_DT == null) {
                    return <Typography>_</Typography>
                }
                return <Typography>{record.Create_DT}</Typography>
            }
        },
        {
            title: "ملبغ",
            dataIndex: "Amount",
            key: "4",
            width: "5%",
        },
        {
            title: "توضیحات",
            dataIndex: "Description",
            key: "5",
            width: "50%",
            render: (_, record) => (
                <Tooltip
                    placement="top"
                    title={<Typography>{record.Description}</Typography>}
                >
                    <Typography.Text
                        className="w-full"
                        ellipsis={true}
                    >
                        {record.Description}
                    </Typography.Text>
                </Tooltip>
            )
        },
        {
            title: "وضعیت",
            dataIndex: "Is_Paid",
            key: "3",
            render: (_, record) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.Is_Paid === true) {
                    name = "پرداخت شده"
                    color = 'success'
                    icon = <CheckCircleOutlined />
                } else {
                    name = "پرداخت نشده";
                    icon = <CloseCircleOutlined />
                    color = 'red'
                }
                return (
                    <Tag className='p-1' icon={icon} color={color} >
                        {name}
                    </Tag >
                )
            }
        },
        {
            title: "تاریخ پرداخت",
            dataIndex: "Paid_DT",
            align: "center",
            key: "5",
            render: (_, record) => {
                if (record.Paid_DT == null) {
                    return <Typography>_</Typography>
                }
                return <Typography>{record.Paid_DT}</Typography>
            }
        },
        {
            title: "عملیات",
            key: "6",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record: any) => (
                <Space size="small">
                    {record.Status !== true ?
                        <>
                            <Button
                                type='link'
                                onClick={() => console.log("پرداخت")}
                                className={"text-primary-500 font-bold"}
                            >
                                پرداخت
                            </Button>
                            <Button
                                type='link'
                                onClick={() => console.log("استعلام")}
                                className={"text-primary-500 font-bold"}
                            >
                                استعلام
                            </Button>
                        </>
                        : <Typography
                            className={"text-gray-400 font-bold cursor-not-allowed"}
                        >
                            پرداخت شده
                        </Typography>
                    }
                </Space >
            )
        },
    ];

    return (
        <>
            <Breadcrumb
                titleIcon={<DocumentChartBarIcon className="w-8" />}
                pages={[
                    { label: "خانه", path: "/" },
                    { label: "لیست پکیج درخواست ها", path: "/request/list" }
                ]}
                currentPage={"پرداخت ها"}
                backLink='/request/list'
            />
            <Card>
                <CustomTable
                    loading={PaymentList.isLoading || PaymentList.isFetching}
                    data={{ records: PaymentList.data }}
                    columns={columns}
                    header={{
                        icon: <ViewColumnsIcon />,
                        text: "لیست پرداخت ها",
                    }}
                />
            </Card>
        </>
    )
}