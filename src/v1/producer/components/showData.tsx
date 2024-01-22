'use client'
import {Descriptions} from "antd";

export default function DisplayData({data}: {
    data: null | { success: boolean, message: string | null, data: string }
}) {

    return (<>
        <Descriptions className="text-right" title="دمو اطلاعات security/getId">
            {/* <Descriptions.Item label="پیام">{data.message}</Descriptions.Item>
            <Descriptions.Item label="وضعیت">{data.success ? "true" : "false"}</Descriptions.Item>
            <Descriptions.Item label="data">{data.data}</Descriptions.Item> */}
        </Descriptions>;
    </>)
}