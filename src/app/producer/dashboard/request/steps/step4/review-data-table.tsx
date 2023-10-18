import {Button, Card, Collapse, Empty, Spin, Table, Typography} from 'antd'
import {ColumnsType} from 'antd/es/table';
import React, {useContext} from 'react'
import {Product} from "../../../../../../../interfaces/requestDetail";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useGetFinalPage from "../../../../../../../hooks/requestDetail/useGetFinalPage";
import {addIndexToData} from "../../../../../../../lib/addIndexToData";
import useDeleteStep from "../../../../../../../hooks/requestDetail/useDeleteStep";

export default function ReviewDataTable() {

    const processController = useContext(StepContext)

    const finalPage = useGetFinalPage(processController.requestMaster.requestMasterUid)

    const deleteStep = useDeleteStep()

    const columns: ColumnsType<Product & { Row: number }> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام محصول",
            dataIndex: "name",
            key: "2",
        },
    ];


    return (
        <>


            <Spin spinning={deleteStep.isMutating}>
                <div className='grid grid-cols-1 gap-5'>
                    {finalPage?.data?.map((item) => {
                        return (
                            <>
                                <Collapse
                                    size="large"
                                    items={[{
                                        label: <div className="text-right">
                                            <div className="flex justify-start items-center">
                                                {`مرحله شماره ${item.stepNumber}`}
                                            </div>
                                        </div>
                                        ,
                                        children: <>
                                            <div className="flex justify-start">
                                                <Button
                                                    type="text"
                                                    className='text-red-500 font-bold ml-3'
                                                    onClick={() => deleteStep.trigger({
                                                        stepNumber: item.stepNumber,
                                                        requestMasterUid: processController.requestMaster.requestMasterUid
                                                    })}
                                                >
                                                    حذف
                                                </Button>
                                            </div>
                                            <Typography className="text-right font-medium text-lg mb-2">
                                                لیست مواد اولیه
                                            </Typography>
                                            <Table
                                                loading={finalPage.isLoading}
                                                columns={columns}
                                                dataSource={addIndexToData(item.products)}
                                                pagination={false}
                                            />
                                            <Typography className="text-right font-medium text-lg mb-2 mt-12">
                                                لیست محصولات
                                            </Typography>
                                            <Table
                                                loading={finalPage.isLoading}
                                                columns={columns}
                                                dataSource={addIndexToData(item.materials)}
                                                pagination={false}
                                            />
                                        </>
                                    }]}
                                />
                                <Card
                                    key={item.stepNumber}
                                    className='w-full shadow'
                                    title
                                >

                                </Card>
                            </>
                        );
                    })}

                    {finalPage?.data?.length === 0 && <Empty/>}
                </div>
            </Spin>

        </>
    )
}