import React from 'react'
import EditModal from './edit-modal'
import {ColumnsType} from 'antd/es/table';
import {Button, Space} from 'antd';
import {ViewColumnsIcon} from '@heroicons/react/24/outline';
import CustomTable from "@/components/custom-table";

export default function DataTable() {


    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            width: "5%",
        },
        {
            title: "عنوان",
            dataIndex: "MaterialName",
        },
        {
            title: "درصد استفاده",
            dataIndex: "MaterialUsagePercentage",
            render: (value) => <>{value}%</>,
        },
        {
            title: "نام تامین کننده ماده اولیه",
            dataIndex: "MaterialSupplyName",
        },
        {
            title: "عملیات",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (value, record) => (
                <Space size='small'>
                    <Button
                        className="text-red-500 font-bold py-2 px-1"
                    // onClick={() => {
                    //     setDeleteVisible(true);
                    //     setRecordToDelete(record.Uid);
                    // }}
                    >
                        حذف
                    </Button>
                    <Button
                        className="text-secondary-500 font-bold py-2 px-1"
                    // onClick={() => {
                    //     setDeleteVisible(true);
                    //     setRecordToDelete(record.Uid);
                    // }}
                    >
                        ویرایش
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <CustomTable
                header={{
                    icon: <ViewColumnsIcon/>,
                    text: 'لیست مواد اولیه',
                    actions: <Button type="primary">safkaskjdf</Button>,
                }}
                setInitialData={() => { }}
                isLoading={false}
                data={data}
                columns={columns}
            />
            <EditModal />
        </>
    )
}



const data = {
    records: [
        {
            Row: 1,
            MaterialName: 'CSO',
            MaterialUsagePercentage: '10',
            MaterialSupplyName: 'تامین کننده',
        },
        {
            Row: 2,
            MaterialName: 'اسلاک',
            MaterialUsagePercentage: '90',
            MaterialSupplyName: 'تامین کننده',
        },
    ],
    count: 2
}