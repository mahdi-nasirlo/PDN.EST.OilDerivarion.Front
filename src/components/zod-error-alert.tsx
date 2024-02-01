import {Alert, Descriptions} from "antd";
import React from "react";
import {SafeParseError} from "zod";

const ZodErrorAlert = (validate: SafeParseError<any>) => (<Alert type="error" message={
    <div>
        <Descriptions>
            {validate.error.issues.map((item) => {
                return <>
                    <Descriptions.Item label={"message"} span={3}>
                        {item.message}
                    </Descriptions.Item>
                    <Descriptions.Item label={"code"} span={2}>
                        {item.code}
                    </Descriptions.Item>
                    <Descriptions.Item label={"received"} span={1}>
                        {/*// @ts-ignore*/}
                        {item.received}
                    </Descriptions.Item>
                    <Descriptions.Item label={"path"} span={1}>
                        {item.path.map(item => item)}
                    </Descriptions.Item>
                </>
            })}
        </Descriptions>
    </div>
}/>)

export {ZodErrorAlert}