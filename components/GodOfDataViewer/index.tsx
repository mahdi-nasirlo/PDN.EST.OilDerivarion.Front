import React from 'react';
import { Alert, Spin } from "antd";
import { z } from "zod";
import { ApiTabType } from "../../hooks/workFlowRequest/useGetStep";
import { RenderItemType } from "./RenderItemType";
import useGetAllHistory from '../../hooks/workFlowRequest/useGetAllHistory';
import WorkFlowSteps from './WorkFlowSteps';

interface PropsType {
    uid: string,
    data: ApiTabType[] | undefined,
    loading?: boolean,
    steps?: boolean
}

const Index = ({
    uid,
    data,
    loading,
    steps = true
}: PropsType) => {

    const logs = useGetAllHistory(uid)

    if (loading && logs.isLoading) {
        return <Spin />
    }

    return (
        <>
            {steps && <WorkFlowSteps logs={logs.data || []} />}

            <RenderItems data={data} uid={uid} />
        </>
    );
};


const RenderItems = ({ data, uid }: { data: ApiTabType[] | undefined, uid: string }) => {


    if (!data || !Array.isArray(data)) {
        return <Alert message="نوع داده صحیح نمی باشد" type="error" className="text-right border border-red-500" />
    }

    return data?.map((value, index) => <RenderItemType uid={uid} index={index} type={value.type} key={value.key}
        url={value.url}
        name={value.name} />)
}

export const TabType = z.object({
    uid: z.string(),
    index: z.number(),
    name: z.string(),
    key: z.string().optional(),
    url: z.string(),
    type: z.enum(["1", "2", "3"])
})


export default Index;