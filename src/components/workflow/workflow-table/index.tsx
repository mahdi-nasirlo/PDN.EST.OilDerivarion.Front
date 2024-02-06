import React from 'react';
import {z} from "zod";
import {workflowApi} from "../../../constance/workflow";
import {ColumnsType} from "antd/es/table";
import {addIndexToData} from "@/utils/addIndexToData";
import CustomTable from "@/components/custom-table";
import {ListBulletIcon} from "@heroicons/react/24/solid";

const Index = (props: {
    data: z.infer<typeof workflowApi.GetAllTask.response.shape.data.shape.tasks.shape.Table>,
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

    return (
        <div>
            <CustomTable
                header={{
                    text: "لیست درخواست ها",
                    icon: <ListBulletIcon className="h-8"/>
                }}
                columns={columns}
                data={{records: addIndexToData(props.data.Values)}}
            />
        </div>
    );
};

export default Index;