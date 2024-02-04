"use client";

import { Button, Card, Col, Tag } from "antd";
import React, { useState } from "react";
import { Row, Typography } from "antd/lib";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { z } from "zod";
import { materialApi } from "../../../../constance/material";
import { CardListTable } from "@/app/(dashboard)/request/components/card-list-table";
import useRequestPackagePartDelete from "@/hooks/material/use-request-package-part-delete";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CardList = ({ data }: {
    data: z.infer<typeof materialApi.GetRequestPackagePartList.response.shape.data> | undefined
}) => {

    const [open, setOpen] = useState<string | boolean>()

    const deletePart = useRequestPackagePartDelete()

    const handleDelete = async () => {

        const res = await deletePart.mutateAsync({ part_UID: open as string })

        if (res.success)
            setOpen(undefined)

    }

    const router = useRouter()

    if (data == undefined || !Array.isArray(data)) { return }

    return (
        <>
            <AnimatePresence>
                {data?.map((item, index) => (
                    <>
                        <Col key={index} xs={24} sm={12} xl={8} xxl={6}>
                            <motion.div
                                key={index}
                                className="relative"
                                transition={{ delay: index / 5 }}
                                initial={{
                                    opacity: 0,
                                    bottom: -25,
                                    left: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    bottom: 0,
                                    left: 0
                                }}
                                exit={{
                                    transition: { duration: 1 },
                                    opacity: 0,
                                    bottom: 25,
                                }}
                            >
                                <Card
                                    className="card-body-p-0 bg-gray-50 bg-opacity-60"
                                // className={`min-h-[480px] h-full py-2 flex flex-col justify-between space-y-4 font-bold text-lg border-1 shadow-md border-solid rounded-xl`}
                                // bodyStyle={{width: "100%", height: "100%"}}
                                >
                                    <div className='h-full p-4 min-h-[520px] flex flex-col justify-between'>
                                        <Typography
                                            className="font-semibold text-lg">{`پکیج شماره ${index + 1}`}</Typography>


                                        <div className="space-y-4 w-full">

                                            <div className="flex justify-between">

                                                <Typography>روش تولید:</Typography>

                                                <Tag color='volcano-inverse'
                                                    className='ml-0 p-1 font-bold'>{item.Part_Type_Value}
                                                </Tag>
                                            </div>


                                            <div className="flex justify-between">

                                                <Typography>وضعیت:</Typography>

                                                {item.Status
                                                    ? <Tag
                                                        className='ml-0 p-1'
                                                        icon={<CheckCircleOutlined />}
                                                        color="success"
                                                    >
                                                        تکمیل شده
                                                    </Tag>
                                                    : <Tag
                                                        className='ml-0 p-1'
                                                        icon={<CloseCircleOutlined />}
                                                        color="error"
                                                    >
                                                        تکمیل نشده
                                                    </Tag>}

                                            </div>

                                            <div className="flex justify-between">

                                                <Typography>تعداد مواد اولیه:</Typography>

                                                <Typography>0</Typography>

                                            </div>

                                            <CardListTable />

                                            <Row gutter={[16, 12]}>
                                                <Col xs={12}>
                                                    <Button
                                                        size="large"
                                                        type="default"
                                                        className="w-full flex items-center justify-center"
                                                        danger
                                                        icon={<DeleteOutlined width={16} height={16} />}
                                                        onClick={() => setOpen(item.UID)}
                                                    >
                                                        حذف
                                                    </Button>
                                                </Col>
                                                <Col xs={12}>
                                                    <Button
                                                        size="large"
                                                        type="primary"
                                                        className="w-full flex items-center justify-center"
                                                        icon={<EditOutlined width={16} height={16} />}
                                                        onClick={() => router.push(`/request/${item.UID}`)}
                                                    >
                                                        ویرایش
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>
                    </>
                ))}
            </AnimatePresence>
            <ConfirmDeleteModal
                open={typeof open === "string"}
                setOpen={setOpen}
                handleDelete={handleDelete}
                title={"حذف پکیج"}
                loading={deletePart.isPending}
            />
        </>
    );
};

export default CardList;