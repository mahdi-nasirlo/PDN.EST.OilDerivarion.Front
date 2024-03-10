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
import usePaymentPaid from '@/hooks/request-package/use-payment-paid';
import ToRial from '@/lib/to-Rial';

interface PropType {
    params: { TaskId: string };
}

export default function Page(props: PropType) {

    const PaymentList = usePaymentList({ package_UID: props.params.TaskId })

    const PaymentPaid = usePaymentPaid();

    const handlePayment = async (record: z.infer<typeof RequestPackageApi.PaymentList.item>) => {
        await PaymentPaid.mutateAsync({
            package_UID: props.params.TaskId,
            payment_UID: record.UID
        });
    };


    const columns: ColumnsType<z.infer<typeof RequestPackageApi.PaymentList.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%",
        },
        {
            title: "عنوان پرداخت",
            dataIndex: "Payment_Type",
            key: "2",
            render: (_, record) => {
                let name = "";
                if (record.Payment_Type === 1) {
                    name = "در انتظار پرداخت هزینه بازدید";
                } else if (record.Payment_Type === 2) {
                    name = "در انتظار پرداخت هزینه پست";
                } else if (record.Payment_Type === 3) {
                    name = "در انتظار پرداخت هزینه آزمایش"
                } else if (record.Payment_Type === 4) {
                    name = "در انتظار پرداخت هزینه صدور کد رهگیری"
                } else {
                    name = "هزینه نامعلوم"
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
            key: "2",
            render: (_, record) => {
                if (record.Create_DT == null) {
                    return <Typography>_</Typography>
                }
                return <Typography>{record.Create_DT}</Typography>
            }
        },
        {
            title: "مبلغ",
            dataIndex: "Amount",
            key: "3",
            width: "5%",
            render: (_, record) => (
                <Typography>
                    {ToRial(record.Amount)}
                </Typography>
            )
        },
        {
            title: "توضیحات",
            dataIndex: "Description",
            key: "4",
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
            ),
        },
        {
            title: "وضعیت",
            dataIndex: "Is_Paid",
            key: "5",
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
            key: "6",
            render: (_, record) => {
                if (record.Paid_DT == null) {
                    return <Typography>_</Typography>
                }
                return <Typography>{record.Paid_DT}</Typography>
            }
        },
        {
            title: "عملیات",
            key: "7",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    {record.Is_Paid !== true ?
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
                                loading={PaymentPaid.isPending}
                                onClick={() => handlePayment(record)}
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
                    header={{
                        icon: <ViewColumnsIcon />,
                        text: "لیست پرداخت ها",
                    }}
                    columns={columns}
                    data={{ records: PaymentList.data }}
                    isLoading={PaymentList.isLoading || PaymentList.isFetching}
                />
            </Card>
        </>
    )
}