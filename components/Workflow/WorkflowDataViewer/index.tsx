import React from 'react';
import WorkflowDataviewerItem, {WorkFlowDataViewerItemType} from "./workflowDataviewerItem";
import {Divider, Empty, Spin} from "antd";

const Index = (props: { data: WorkFlowDataViewerItemType[], loading?: boolean }) => {

    if (props.loading) {
        return <Spin/>
    }

    const renderItems = () => {
        const renderedItems: any[] = [];
        for (const key in props.data) {
            if (props.data.hasOwnProperty(key)) {
                const item = props.data[key];
                if (item?.title || item?.model || item?.table) {
                    renderedItems.push(<WorkflowDataviewerItem key={key} data={item}/>);
                }
            }
        }

        return renderedItems;
    }

    function addItemBetween(array: any[], itemToAdd: any) {
        const newArray: any[] = [];
        const lastIndex = array.length - 1;

        if (array && array.length > 0) {
            for (let i = 0; i < lastIndex; i++) {
                newArray.push(array[i]);
                newArray.push(itemToAdd);
            }

            newArray.push(array[lastIndex]); // Add the last item of the original array
        }

        if (!array || array.length === 0) {
            newArray.push(<Empty/>)
        }

        return newArray;
    }

    const renderView = addItemBetween(renderItems(), <Divider className="mb-10"/>)

    return (
        <>
            {renderView}
        </>
    );
};

export default Index;