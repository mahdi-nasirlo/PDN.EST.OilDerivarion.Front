import React from 'react';
import WorkflowDataviewerItem, {WorkFlowDataViewerItemType} from "./workflowDataviewerItem";
import {Spin} from "antd";

const Index = (props: { data: string, loading?: boolean }) => {

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
            <WorkflowDataviewerItem data={data}/>
        </>
    );
};

export default Index;