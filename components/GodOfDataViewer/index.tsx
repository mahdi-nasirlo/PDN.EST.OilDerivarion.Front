import React from 'react';
import {Alert, Spin} from "antd";
import {z} from "zod";
import {ApiTabType} from "../../hooks/workFlowRequest/useGetStep";
import {RenderItemType} from "./RenderItemType";

interface PropsType {
    uid: string,
    data: ApiTabType[] | undefined,
    loading?: boolean
}

const Index = (props: PropsType) => {

    if (props.loading) {
        return <Spin/>
    }

    return (
        <>
            <RenderItems data={props.data} uid={props.uid}/>
        </>
    );
};


const RenderItems = ({data, uid}: { data: ApiTabType[] | undefined, uid: string }) => {


    if (!data || !Array.isArray(data)) {
        return <Alert message="نوع داده صحیح نمی باشد" type="error" className="text-right border border-red-500"/>
    }

    return data?.map((value, index) => <RenderItemType uid={uid} index={index} type={value.type} key={value.key}
                                                       url={value.url}
                                                       name={value.name}/>)
}

export const TabType = z.object({
    uid: z.string(),
    index: z.number(),
    name: z.string(),
    key: z.string().optional(),
    url: z.string(),
    type: z.enum(["1", "2"])
})


export default Index;