import {z} from "zod";
import React, {useState} from "react";
import {TabType} from "./index";
import axios from "axios";
import getTokenFromSession from "../../lib/server/getToken";
import {Collapse, Empty, notification, Spin, Typography} from "antd";
import useSWR from "swr";
import handleError from "../../lib/server/handleError";
import WorkflowDataViewer from "../Workflow/WorkflowDataViewer";
import DataViewer from "../FormBuilder/DataViewer";

export const RenderItemType = (props: z.infer<typeof TabType>) => {

    const [isFirst, setIsFirst] = useState(false)

    const {data, isLoading} = useSWR(isFirst ? props.url : null, () => fetcher({url: props.url}))

    let ItemType

    switch (props.type) {
        case "1":
            ItemType = <WorkflowDataViewer data={data}/>
            break;
        case "2":
            ItemType = <DataViewer data={data}/>
            break;
        default:
            ItemType = <Typography>نوع دیتا پشتیبانی نمیشود</Typography>
    }

    return <>
        <Collapse
            onChange={key => {
                if (key.length > 0) {
                    setIsFirst(true)
                }
            }}
            style={{margin: "16px 0"}}
            className="my-3"
            size="large"
            items={[{
                label: props.name,
                children: isLoading ? <Spin/> : <div>{data ? ItemType : <Empty/>}</div>
            }]}
        />
    </>
}

const fetcher = async ({url}: { url: string }) => {

    const token = await getTokenFromSession() || ""

    try {

        const res = await axios.request({
            url: process.env.NEXT_PUBLIC_API_URL + url,
            method: "post",
            data: {uid: "488e7f5c-c0f1-443d-a933-363fe99c3292"},
            headers: {
                "Authorization": token
            },
        })

        if (!res?.data?.success) {
            notification.open({
                type: "error",
                message: res?.data?.message
            })
        }

        return res.data.data

    } catch (error: any) {

        await handleError(error)

        return []
    }

}