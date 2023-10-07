"use client";


import {Table, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import React from 'react'
import useSWR from "swr";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {State} from "../../../../../interfaces/State";


interface DataType {
    key: string;
    Row: number;
    NameRawMaterial: string;
    Name: string;
}


export default function DataTable() {

    const {data: state, isLoading: ldState} = useSWR<{
        count: number,
        records: State[]
    }>("/State/GetPage", url => listFetcher(url, {
        arg: {
            "name": null,
            "is_Active": true,
            "fromRecord": 0,
            "selectRecord": 100000
        }
    }))


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "استان",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "شهر",
            dataIndex: "Name",
            key: "3",
        },
    ];


    return (
        <div className="box-border w-full mt-8 p-6">
            <div className="flex justify-start items-center">
                <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست مواد اولیه</Typography>
            </div>
            <Table
                className="mt-6"
                loading={ldState}
                columns={columns}
                dataSource={addIndexToData(state?.records)}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    defaultCurrent: 1,
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "16px 0",
                    },
                }}
            />
        </div>
    )
}


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        NameRawMaterial: "مازندران",
        Name: "بابل"

    },
    {
        key: "2",
        Row: 2,
        NameRawMaterial: "مازندران",
        Name: "بابل"

    },
];
