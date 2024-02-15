import {z} from "zod";
import React, {useState} from "react";
import {TabType} from "./index";
import axios from "axios";
import getTokenFromSession from "../../lib/server/getToken";
import {Collapse, Empty, notification, Spin, Typography} from "antd";
import useSWR from "swr";
import handleError from "../../lib/server/handleError";
import DataViewer from "../FormBuilder/DataViewer";
import MediaTypeItems from "../Workflow/WorkflowDataViewer/MediaTypeItems";

export const RenderItemType = (props: z.infer<typeof TabType>) => {

    const [isFirst, setIsFirst] = useState(props.index === 0)


    const {data, isLoading} = useSWR(isFirst ? props.url : null, () => fetcher({url: props.url, uid: props.uid}))

    let ItemType

    switch (props.type) {
        case "1":
            // ItemType = <WorkflowDataViewer data={data}/>
            break;
        case "2":
            ItemType = <DataViewer data={data}/>
            break;
        case "3":
            ItemType = <MediaTypeItems data={data}/>
            break;
        default:
            ItemType = <Typography>نوع دیتا پشتیبانی نمیشود</Typography>
    }

    return <>
        <Collapse
            defaultActiveKey={props.index === 0 ? ["0"] : []}
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

const fetcher = async ({url, uid}: { url: string, uid: string }) => {

    console.log(uid)

    const token = await getTokenFromSession() || ""

    try {

        const res = await axios.request({
            url: process.env.NEXT_PUBLIC_API_URL + url,
            method: "post",
            data: {uid: uid},
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