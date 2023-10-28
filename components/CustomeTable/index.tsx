import React from 'react';
import {Table, TableProps} from "antd";
import {addIndexToData} from "../../lib/addIndexToData";
import getPageRecordNumber from "../../lib/getPageRecordNumber";

interface RecordeValue {
    mutate: (arg: any) => void,
    fetcherValue: { fromRecord: number, selectRecord: number } & any,
    isLoading: boolean,
    data: {
        records: any[];
        count: number;
    } | undefined
}

const Index = (props: TableProps<any> & RecordeValue) => {

    return (
        <Table
            loading={props.isLoading}
            dataSource={addIndexToData(props.data?.records)}
            className="mt-6"
            columns={props.columns}
            pagination={{
                total: props.data?.count,
                onChange: async (e) => {
                    await props.mutate({...props.fetcherValue, ...getPageRecordNumber(e)})
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
    );
};

export default Index;