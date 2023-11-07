import React from 'react';
import WorkflowDataviewerItem, {WorkFlowDataViewerItemType} from "./workflowDataviewerItem";
import {Divider} from "antd";

const Index = (props: { data: WorkFlowDataViewerItemType[] }) => {

    const renderItems = () => {
        const renderedItems = [];
        for (const key in props.data) {
            if (props.data.hasOwnProperty(key)) {
                const item = props.data[key];
                if (item?.title || item?.model || item?.table) {
                    console.log(item)
                    renderedItems.push(<WorkflowDataviewerItem key={key} data={item}/>);
                }
            }
        }

        return renderedItems;
    }

    function addItemBetween(array, itemToAdd) {
        const newArray = [];
        const lastIndex = array.length - 1;

        for (let i = 0; i < lastIndex; i++) {
            newArray.push(array[i]);
            newArray.push(itemToAdd);
        }

        newArray.push(array[lastIndex]); // Add the last item of the original array

        return newArray;
    }


    return (
        <>
            {addItemBetween(renderItems(), <Divider/>)}
        </>
    );
};

export default Index;