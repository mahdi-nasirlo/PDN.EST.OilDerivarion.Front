import { Table, TableColumnsType } from 'antd';
import React, { useEffect, useState } from 'react'
import { addAlphabetToData } from '../../../../../lib/addAlphabetToData';
import useSWR from 'swr';
import { listFetcher } from '../../../../../lib/server/listFetcher';

export default function ExpandedDetailsTable({ data }: { data: any }) {
    const [activeExpRow, setActiveExpRow] = useState<string[]>();

    const defaultValue = {
        requestMasterUid: data.uid
    };


    const { data: dataSource, isLoading, mutate } = useSWR<any[]>(
        ["/TestItem/GetAllByRequestMaster", defaultValue],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
    );


    const expandColumns: TableColumnsType<any> = [
        {
            title: "#",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "فاکتور های آزمون",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "روش آزمون",
            dataIndex: "TestMethod",
            key: "3",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "MeasureName",
            key: "3",
        },
    ];

    useEffect(() => {
        if (!isLoading) {
            mutate();
        }
    }, [data]);


    return (
        <>
            <Table
                columns={expandColumns}
                dataSource={addAlphabetToData(dataSource)}
                loading={isLoading}
                pagination={false}
                expandable={{
                    expandedRowKeys: activeExpRow,
                }}
            />
        </>
    );
};


const data = [{}]