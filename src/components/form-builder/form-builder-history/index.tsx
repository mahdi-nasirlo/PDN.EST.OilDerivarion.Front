"use client"

import React, {useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {useProducerFormsGetDocHistory} from "@/hooks/form-maker/use-producer-forms-get-doc-history";
import {z} from "zod";
import {Button, Modal, Spin} from "antd";
import useProducerFormsGetDocSchemaByUID from "@/hooks/form-maker/use-producer-forms-get-doc-schema-by-UID";
import DataViewer from "@/components/form-builder/data-viewer";
import CustomTable from "@/components/custom-table";
import {RectangleStackIcon} from "@heroicons/react/24/outline";

const Index = ({formKey}: { formKey: string }) => {

    const [formUid, setFormUid] = useState<string>()

    const historyList = useProducerFormsGetDocHistory(formKey)

    const history = useProducerFormsGetDocSchemaByUID({form_Key: formKey, form_UID: formUid as string})

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

    return (
        <div>
            <CustomTable
                isLoading={historyList.isLoading || history.isFetching}
                setInitialData={() => {
                }}
                columns={columns}
                data={historyList.data?.form_Data}
                header={{
                    text: "تاریخچه تغییرات فرم",
                    icon: <RectangleStackIcon className="w-8"/>
                }}
            />
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
                    {history.data?.length && <DataViewer
                        schema={history.data[0].Schema_Data}
                        data={history.data[0].form_data}
                    />}
                </Spin>
            </Modal>
        </div>
    );
};

export default Index;