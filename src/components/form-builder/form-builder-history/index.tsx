"use client"

import React, {useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {useProducerFormsGetDocHistory} from "@/hooks/form-maker/use-producer-forms-get-doc-history";
import {z} from "zod";
import {Alert, Button, Collapse, Modal, Spin, Typography} from "antd";
import useProducerFormsGetDocSchemaByUID from "@/hooks/form-maker/use-producer-forms-get-doc-schema-by-UID";
import CustomTable from "@/components/custom-table";
import {RectangleStackIcon} from "@heroicons/react/24/outline";
import {motion} from "framer-motion";
import {formMakerApi} from "../../../constance/form-maker";
import {ZodErrorAlert} from "@/components/zod-error-alert";
import DataViewer from "@/components/form-builder/data-viewer";

const Index = ({formKey}: { formKey: string }) => {

    const [formUid, setFormUid] = useState<string>()

    const historyList = useProducerFormsGetDocHistory(formKey)

    const history = useProducerFormsGetDocSchemaByUID({form_Key: formKey, form_UID: formUid as string})

    // if (records && form?.Form_Key && form.Form_Key in records) {
    //     initialValues = records[form.Form_Key]
    // }

    const columns: ColumnsType<z.infer<typeof historyList.item>> = [
        {
            title: "تاریخ",
            dataIndex: "last_modify_fa"
        },
        {
            title: "وضعیت",
            dataIndex: "is_draft",
            render: (value, record) => `${record.is_draft} _ ${record.form_is_expired}`
        },
        {
            title: "وضعیت",
            render: (value, record) => <Button
                type="text"
                className="text-primary-500 font-semibold"
                onClick={() => setFormUid(record.UID)}
            >
                مشاهده
            </Button>
        }
    ]

    const renderTable = () => {

        try {
            const dataTable = formMakerApi.ProducerFormsGetDocSchemaByUid.response.shape.data.safeParse(history.data)

            if (!dataTable.success)
                return <ZodErrorAlert success={false} error={dataTable.error}/>

            const {data} = dataTable

            return <DataViewer data={data[0].form_data} schema={data[0].Schema_Data}/>

        } catch (e: unknown) {
            return <Alert message={""}/>
        }
    }

    return (
        <div>
            {(historyList.data?.form_Data.length ?? 0) > 0 && <motion.div
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                <Collapse
                    className="mb-8"
                    items={[{
                        collapsible: "header",
                        label: <div className="flex items-center">
                            <RectangleStackIcon className="w-8 ml-2"/>
                            <Typography>تاریخچه تغییرات فرم</Typography>
                        </div>,
                        children: <CustomTable
                            isLoading={historyList.isLoading || history.isFetching}
                            setInitialData={() => {
                            }}
                            columns={columns}
                            data={historyList.data?.form_Data}
                            // header={{
                            //     text: "تاریخچه تغییرات فرم",
                            //     icon: <RectangleStackIcon
                            //         className="w-8"/>
                            // }}
                        />
                    }]}/>
            </motion.div>}
            <Modal
                className="min-w-[1000px]"
                open={typeof formUid == "string"}
                title="مشاهده تاریخچه"
                onCancel={() => setFormUid(undefined)}
                footer={[
                    <Button
                        key={"1"}
                        type="default"
                        size="large"
                        className="bg-gray-100 text-warmGray-500"
                        onClick={() => setFormUid(undefined)}
                        loading={history.isLoading}
                    >
                        انصراف
                    </Button>
                ]}
            >
                <Spin className="w-full flex justify-center items-center"
                      spinning={history.isLoading || history.isFetching}>
                    {history.data && renderTable()}
                    {/*{history.data?.length && <DataViewer*/}
                    {/*    schema={history.data[0].Schema_Data}*/}
                    {/*    data={history.data[0].form_data[formKey]}*/}
                    {/*/>}*/}
                </Spin>
            </Modal>
        </div>
    );
};

export default Index;