import React, { useState } from 'react'
import { z } from 'zod';
import usePaymentPostAdd from '@/hooks/request-package/use-payment-post-add';
import { useValidation } from '@/hooks/use-validation';
import { Button, Col, Form, InputNumber, Row, Space, Tag } from 'antd'
import { RequestPackageApi } from 'constance/request-package';
import CustomTable from "@/components/custom-table"
import usePaymentPostList from '@/hooks/request-package/use-payment-post-list';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import usePaymentPostDelete from '@/hooks/request-package/use-payment-post-delete';

interface TProps {
    package_UID: string
}

export default function BoxPostage({ package_UID }: TProps) {

    const [form, rules] = useValidation(RequestPackageApi.PaymentPostAdd.type);

    const PaymentPostAdd = usePaymentPostAdd();

    const PaymentPostList = usePaymentPostList({ package_UID: package_UID })

    const handleSubmit = async (
        values: z.infer<typeof RequestPackageApi.PaymentPostAdd.type>
    ) => {
        const res = await PaymentPostAdd.mutateAsync({
            package_UID: package_UID,
            amount: values.amount
        });
        if (res) {
            form.resetFields();
        }
    };
    const [uidDelete, setUidDelete] = useState<string>()

    const PaymentPostDelete = usePaymentPostDelete()

    const columns: ColumnsType<z.infer<typeof RequestPackageApi.PaymentPostList.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%",
        },
        {
            title: "هزینه پست",
            dataIndex: "Amount",
            key: "2",
            render: (_, record) => (
                <>
                    {record.Amount} ریال
                </>
            )
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "Create_DT",
            key: "3",
        },
        {
            title: "وضعیت پرداخت",
            dataIndex: "Is_Paid",
            key: "4",
            render: (_, record) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.Is_Paid === true) {
                    color = "success";
                    name = "پرداخت شده";
                    icon = <CheckCircleOutlined />;
                } else {
                    color = "red";
                    name = "پرداخت نشده";
                    icon = <CloseCircleOutlined />;
                }
                return (
                    <Tag className='p-1' icon={icon} color={color}>
                        {name}
                    </Tag>
                );
            }
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
                        className={"text-red-500 font-bold"}
                        onClick={() => setUidDelete(record.UID)}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Form form={form} onFinish={handleSubmit} disabled={PaymentPostAdd.isPending}>
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={16}>
                        <Form.Item
                            required={false}
                            name="amount"
                            label="هزینه پست (ریال)"
                            labelCol={{ style: { marginTop: "6px" } }}
                            rules={[rules]}
                        >
                            <InputNumber
                                size='large'
                                controls={false}
                                className='w-full'
                                placeholder='وارد کنید'
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Button
                            loading={PaymentPostAdd.isPending}
                            disabled={PaymentPostAdd.isPending}
                            className='w-full'
                            type='primary'
                            htmlType='submit'
                            size='large'
                        >
                            ارسال برای متقاضی
                        </Button>
                    </Col>
                </Row>
            </Form >
            <CustomTable
                columns={columns}
                data={{ records: PaymentPostList.data }}
            />
            <ConfirmDeleteModal
                title="هزینه پست"
                open={uidDelete}
                setOpen={setUidDelete}
                loading={PaymentPostDelete.isPending}
                handleDelete={async () => {
                    const res = await PaymentPostDelete.mutateAsync({
                        payment_UID: uidDelete as string,
                        package_UID,
                    });
                    if (res) {
                        setUidDelete(undefined);
                    }
                }}
            />
        </>
    )
}
