import React, {useState} from 'react';
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

    return (
        <>
            <Table
                {...props}
                loading={props.isLoading}
                dataSource={addIndexToData(props.data?.records, "Row", startRow)}
                className="mt-6"
                columns={props.columns}
                pagination={{
                    total: props.data?.count,
                    onChange: async (e: any) => {
                        setStartRow(getPageRecordNumber(e).fromRecord)
                        await props.setInitialData((prev: any) => {
                            delete prev.fromRecord
                            delete prev.selectRecord
                            return {...getPageRecordNumber(e), ...prev}
                        })
                    },
                    defaultPageSize: 5,
                    showSizeChanger: false,
                    defaultCurrent: 1,
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