import { Table, TableColumnsType, Typography } from 'antd';
import React, { useEffect } from 'react'
import { addAlphabetToData } from '../../../../../lib/addAlphabetToData';
import useSWR from 'swr';
import { listFetcher } from '../../../../../lib/server/listFetcher';

export default function ExpandedDetailsTable({ data }: { data: any }) {

    const defaultValue = { requestMasterUid: data.uid };


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
            dataIndex: "name",
            key: "2",
        },
        {
            title: "روش آزمون",
            dataIndex: "testMethod",
            key: "3",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "measureName",
            key: "3",
        },
        {
            title: "مدت زمان انجام آزمایش",
            dataIndex: "testDuration",
            key: "4",
            render: (_, record: any) => {
                return (
                    <Typography.Text>
                        {record.testDuration !== undefined && record.testDuration !== null
                            ? `${record.testDuration} ساعت`
                            : 'تعریف نشده'}
                    </Typography.Text>
                );
            },
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
            />
        </>
    );
};
