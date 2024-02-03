import React from 'react';
import {z} from "zod";
import {workflowApi} from "../../../constance/workflow";
import {ColumnsType} from "antd/es/table";
import {Table} from "antd/lib";
import {addIndexToData} from "@/utils/addIndexToData";

const Index = (props: {
    data: z.infer<typeof workflowApi.dataTable.response.shape.data.shape.tasks.shape.Table>,
    extraColumns?: ColumnsType<any>;
}) => {

    const columns: ColumnsType<any> = props.data.Header.filter(item => !item.Hidden)
        .map((item) => ({dataIndex: item.Key, title: item.Value, render: (value, record) => value ?? "_"}))


    columns.unshift({
        title: "ردیف",
        dataIndex: "Row",
        key: "Row",
        width: "5%",
    });

    if (props.extraColumns) {
        columns.push(...props.extraColumns);
    }

    console.log(props.data.Header)

    return (
        <div>
            <Table
                columns={columns}
                dataSource={addIndexToData(props.data.Values)}
            />
        </div>
    );
};

export default Index;