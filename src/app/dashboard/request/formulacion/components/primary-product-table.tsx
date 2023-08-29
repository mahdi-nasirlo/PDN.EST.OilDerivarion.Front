'use client'
import {Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import React from "react";
import {RequestDetail} from "../../../../../../interfaces/requestDetail";


const columns: ColumnsType<RequestDetail> = [
    {
        title: 'ردیف',
        width: 100,
        dataIndex: 'MaterialUid',
        key: 'MaterialUid',
    },
    {
        title: 'نام مواد',
        width: 100,
        dataIndex: 'MaterialName',
        key: 'MaterialName',
    },
    {
        title: 'میزان مصرف برای یک واحد',
        dataIndex: 'MaterialUsagePercentage',
        key: 'MaterialUsagePercentage',
        width: 150,
    },
    {
        title: 'درصد',
        dataIndex: 'MaterialUsagePercentage',
        key: 'MaterialUsagePercentage',
        width: 150,
    },
    {
        title: 'میزان مصرف',
        dataIndex: 'MaterialTotalConsumption',
        key: 'MaterialTotalConsumption',
        width: 150,
    },
    {
        title: "منابع عمده تامین",
        children: [
            {
                title: "درصد تامین خارجی",
                dataIndex: "MaterialInternalSupplyPercentage",
                key: '4',
                align: "center",
            },
            {
                title: "درصد تامین داخلی",
                dataIndex: "MaterialInternalSupplyPercentage",
                key: '4',
                align: "center",
            },
        ],
    },
    {
        title: 'جزئیات',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: () => <>
            <div className={"flex justify-between"}>
                <Typography className={"text-primary-500"}>ویرایش</Typography>
                <Typography className={"text-red-500"}>حذف</Typography>
            </div>
        </>,
    },
];

export default function PrimaryProductTable({data, loading = false}: { data: RequestDetail[], loading: boolean }) {
    console.log(data)
    return <>
        <Table loading={loading} className={"mt-6"} pagination={false} columns={columns} dataSource={data || []}
               scroll={{x: 1500, y: 300}}/>
    </>
}

