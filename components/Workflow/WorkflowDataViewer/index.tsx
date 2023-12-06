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


    // function addItemBetween(array: any[], itemToAdd: any) {
    //     const newArray: any[] = [];
    //     const lastIndex = array.length - 1;
    //
    //     if (array && array.length > 0) {
    //         for (let i = 0; i < lastIndex; i++) {
    //             newArray.push(array[i]);
    //             newArray.push(itemToAdd);
    //         }
    //
    //         newArray.push(array[lastIndex]); // Add the last item of the original array
    //     }
    //
    //     if (!array || array.length === 0) {
    //         newArray.push(<Empty/>)
    //     }
    //
    //     return newArray;
    // }

    // const renderView = addItemBetween(renderItems(), <Divider className="mb-10"/>)

    return (
        <>
            <WorkflowDataviewerItem data={data}/>
        </>
    );
};

export default Index;