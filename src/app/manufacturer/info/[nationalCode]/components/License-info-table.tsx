import { Divider, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React from 'react'

export default function LicenseInfoTable({ params }: { params: { nationalCode: string } }) {

    interface DataType {
        key: string;
        Row: number;
        ProductName: string;
        TrackingCode: string;
        ConfirmedRequestCode: string;
        DateRegistration: string;
        call: string;
    }


    const columns3: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "  نام مجوز   ",
            dataIndex: "ProductName",
            key: "2",
        },
        {
            title: " تاریخ صدور ",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "  تاریخ اعتبار  ",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
        },
    ];


    return (
        <>
            <Divider />
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                اطلاعات مجوز
            </Typography>
            <Table
                className="mt-8"
                columns={columns3}
                dataSource={[]}
                pagination={false}
            />
        </>
    )

}
