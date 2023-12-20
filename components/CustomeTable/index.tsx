import React, {useEffect, useState} from 'react';
import {Table, TableProps} from "antd";
import {addIndexToData} from "../../lib/addIndexToData";
import getPageRecordNumber from "../../lib/getPageRecordNumber";

interface RecordeValue {
    setInitialData: (arg: any) => void,
    isLoading: boolean,
    data: {
        records: any[];
        count: number;
    } | undefined
}

const Index = (props: TableProps<any> & RecordeValue) => {

    const [startRow, setStartRow] = useState(1)

    const [page, setPage] = useState(1)

    useEffect(() => {

        if (props.data?.count && Math.ceil(((props.data?.count || 1) / 5)) < page) {
            setPage(1)
        }

    }, [props.data?.count, page])

    return (
        <>
            <Table
                {...props}
                loading={props.isLoading}
                dataSource={addIndexToData(props.data?.records, "Row", ((page - 1) * 5) + 1)}
                className="mt-6"
                columns={props.columns}
                pagination={{
                    total: props.data?.count,
                    onChange: async (e: any) => {
                        setPage(e)
                        props.setInitialData((prev: any) => {
                            delete prev.fromRecord
                            delete prev.selectRecord
                            return {...getPageRecordNumber(e), ...prev}
                        })
                        setStartRow(getPageRecordNumber(e).fromRecord + 1)
                    },
                    defaultPageSize: 5,
                    showSizeChanger: false,
                    defaultCurrent: 1,
                    current: page,
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "16px 0",
                    },
                }}
            />
        </>
    );
};

export default Index;