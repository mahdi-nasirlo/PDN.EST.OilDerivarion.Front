"use client";


import {Button, Divider, Space, Tag, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import CustomeTable from "../../../../../../../../components/CustomeTable";
import DateForm from './date-form';
import ResultModal from './result-modal';
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../../../lib/server/mutationFetcher";
import {useForm} from "antd/es/form/Form";


interface Props {
    Uid: string,
    Measure_Id: number,
    ReNewabillity: number,
    ReNewabillity_Value: number,
    TestMethod: string,
    Name: string,
    IsActive: boolean,
    MeasureName: string

}


export default function DataTable({labresult, ldlabresult, params, mutate}: {
    mutate: () => void
    params: any
    ldlabresult: any
    labresult: any
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [recordUid, setRecordUid] = useState<Props>();


    const {isMutating, trigger} = useSWRMutation(
        "/TestResult/Create",
        mutationFetcher
    );


    const [form] = useForm();

    const handleFormSubmit = async (values: any) => {
        values.testItemUid = recordUid?.Uid
        values.requestBarcodeUid = params
        const res = await trigger(values);

        if (res) {
            await mutate();

            setModalVisible(false);
        }
        form.resetFields();
    };


    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "فاکتور آزمون",
            dataIndex: "Name",
          
        },
        {
            title: "روش آزمون",
            dataIndex: "TestMethod",
            key: "2",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "MeasureName",
            key: "2",
        },
        {
            title: "فعال/غیرفعال",
            dataIndex: "IsActive",
            key: "5",
            render(_, record) {
                let color = "";
                let name = "";

                if (record.IsActive === false) {
                    color = "red";
                    name = "غیر فعال";
                } else if (record.IsActive === true) {
                    color = "success";
                    name = "فعال";
                } else {
                    color = "warning";
                    name = "_";
                }

                return (
                    <Tag color={color}>
                        {name}
                    </Tag>
                );
            }
        },

        {
            title: "مرجع",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "نتیجه آزمون",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "حدود قابل قبول",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "تجدید پذیری",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "واحد تجدید پذیری",
            dataIndex: "Tracking",
            key: "2",
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
                        className="text-secondary-500 font-bold"
                        onClick={() => {
                            setModalVisible(true);
                            setRecordUid(record)

                        }}
                    >
                        ثبت نتیجه
                    </Button>

                </Space>
            ),
        },
    ];


    return (
        <>
            <div className="box-border w-full mt-8 p-6">

                <Typography className="mt-3 mb-6 text-right font-medium text-base">
                    لطفا اطلاعات خواسته شده را با دقت وارد نمایید.</Typography>
                <Divider />


                <DateForm />
                <Divider />
                <Typography className="mt-3 mb-6 text-right font-medium text-base">
                    نتیجه آزمون
                </Typography>
                <CustomeTable
                    setInitialData={() => {
                    }}
                    isLoading={ldlabresult}
                    data={{count: labresult?.length, records: labresult}}
                    rowKey={"Row"}
                    columns={columns}

                />

                <ResultModal handleFormSubmit={handleFormSubmit} setModalVisible={setModalVisible}
                             modalVisible={modalVisible}/>
            </div>
        </>
    )
}

