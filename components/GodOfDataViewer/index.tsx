import React from 'react';
import {Spin} from "antd";
import {z} from "zod";
import {ApiTabType} from "../../hooks/workFlowRequest/useGetStep";
import {RenderItemType} from "./RenderItemType";

interface PropsType {
    data: ApiTabType[] | undefined,
    loading?: boolean
}

const Index = (props: PropsType) => {

    if (props.loading) {
        return <Spin/>
    }

    return (
        <>
            <RenderItems data={props.data}/>
        </>
    );
};


const RenderItems = ({data}: { data: ApiTabType[] | undefined }) => {

    return data?.map((value, index) => <RenderItemType index={index} type={value.type} key={value.key} url={value.url}
                                                       name={value.name}/>)
}

export const TabType = z.object({
    index: z.number(),
    name: z.string(),
    key: z.string().optional(),
    url: z.string(),
    type: z.enum(["1", "2"])
})


export default Index;