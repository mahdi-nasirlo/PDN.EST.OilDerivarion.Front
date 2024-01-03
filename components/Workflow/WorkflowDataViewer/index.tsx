import React from 'react';
import WorkflowDataviewerItem, {WorkFlowDataViewerItemType} from "./workflowDataviewerItem";
import {Spin} from "antd";
import {ColumnType} from "antd/lib/table";
import {ColumnGroupType} from "rc-table/lib/interface";


const Index = (props: { data: string, loading?: boolean, columns?: (ColumnGroupType<any> | ColumnType<any>)[] }) => {

    if (props.loading) {
        return <Spin/>
    }

    let data: WorkFlowDataViewerItemType

    try {
        data = JSON.parse(props.data)
    } catch (e) {
        data = {} as WorkFlowDataViewerItemType
    }

    return (
        <>
            <WorkflowDataviewerItem data={data} columns={props.columns}/>
        </>
    );
};

export default Index;