"use client";

import {Button, Card, Col, Tag} from "antd";
import React from "react";
import {Row, Typography} from "antd/lib";
import {CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {z} from "zod";
import {materialApi} from "../../../../constance/material";
import {CardListTable} from "@/app/(dashboard)/request/components/card-list-table";

const CardList = ({data}: {
    data: z.infer<typeof materialApi.GetRequestPackagePartList.response.shape.data> | undefined
}) => {
    // const [status, setStatus] = useState(true);
    //
    // const cards = new Array(4).fill(null).map((_, index) => {
    //     const isFirstCard = index === 0;
    //     const cardStyle = isFirstCard
    //         ? "shadow-none border-dashed rounded-xl border-primary-500"
    //         : "shadow-md border-solid rounded-xl";
    //
    //     return (
    //
    //
    //                 {/*<ConfirmDeleteModal*/}
    //                 {/*    title='زیر درخواست'*/}
    //                 {/*    open={deleteModal}*/}
    //                 {/*    setOpen={setDeleteModal}*/}
    //                 {/*    handleDelete={() => setDeleteModal(false)}*/}
    //                 {/*/>*/}
    //             </Card>
    //         </Col>
    //     );
    // });

    return data?.map((item, index) => (<>
        <Col key={index} xs={24} sm={12} lg={8} xl={6}>
            <Card
                className="card-body-p-0"
                // className={`min-h-[480px] h-full py-2 flex flex-col justify-between space-y-4 font-bold text-lg border-1 shadow-md border-solid rounded-xl`}
                // bodyStyle={{width: "100%", height: "100%"}}
            >
                <div className='h-full p-4 min-h-[520px] flex flex-col justify-between'>
                    <Typography className="font-semibold text-lg">{`زیر درخواست شماره ${index + 1}`}</Typography>


                    <div className="space-y-4 w-full">

                        <div className="flex justify-between">

                            <Typography>روش تولید:</Typography>

                            <Tag color='volcano-inverse' className='ml-0 p-1 font-bold'>بلندینگ</Tag>

                        </div>


                        <div className="flex justify-between">

                            <Typography>وضعیت:</Typography>

                            {item.Status
                                ? <Tag
                                    className='ml-0 p-1'
                                    icon={<CheckCircleOutlined/>}
                                    color="success"
                                >
                                    تکمیل شده
                                </Tag>
                                : <Tag
                                    className='ml-0 p-1'
                                    icon={<CloseCircleOutlined/>}
                                    color="error"
                                >
                                    تکمیل نشده
                                </Tag>}

                        </div>

                        <div className="flex justify-between">

                            <Typography>تعداد مواد اولیه:</Typography>

                            <Typography>0</Typography>

                        </div>

                        <CardListTable/>

                        <Row gutter={[16, 12]}>
                            <Col xs={12}>
                                <Button
                                    size="large"
                                    type="default"
                                    className="w-full flex items-center justify-center bg-gray-50"
                                    danger
                                    icon={<DeleteOutlined width={16} height={16}/>}
                                    // onClick={() => setDeleteModal(true)}
                                >
                                    حذف
                                </Button>
                            </Col>
                            <Col xs={12}>
                                <Button
                                    size="large"
                                    type="primary"
                                    className="w-full flex items-center justify-center"
                                    icon={<EditOutlined width={16} height={16}/>}
                                    // onClick={HandelEditPackage}
                                >
                                    ویرایش
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </Col>
    </>));
};

export default CardList;