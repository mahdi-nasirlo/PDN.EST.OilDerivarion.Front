import { Table, TableColumnsType } from 'antd';
import React, { useState } from 'react'
import { addAlphabetToData } from '../../../../../lib/addAlphabetToData';

export default function ExpandedDetailsTable({
    product,
    // mutate: mutateTable
}: {
    product: any,
    // mutate: any
}) {
    const [activeExpRow, setActiveExpRow] = useState<string[]>();

    const [open, setOpen] = useState<boolean>(false);
    const expandColumns: TableColumnsType<any> = [
        {
            title: "#",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "فاکتور های آزمون",
            dataIndex: "MaterialName",
            key: "2",
        },
        {
            title: "روش آزمون",
            dataIndex: "MaterialName",
            key: "3",
        },
    ];


    return (
        <>
            <Table
                columns={expandColumns}
                dataSource={addAlphabetToData(data)}
                // loading={isLoading || isMutating}
                pagination={false}
                expandable={{
                    expandedRowKeys: activeExpRow,
                }}
            />
        </>
    );
};


const data = [{}]