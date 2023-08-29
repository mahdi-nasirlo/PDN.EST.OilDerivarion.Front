"use client";

import {Button, Col, Divider, Form, Input, notification, Row, Typography, Upload,} from "antd";
import React, {useState} from "react";
import {UploadOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {IconType, NotificationPlacement} from "antd/es/notification/interface";
import {createRequestMaster} from "../../../../../units/RequestMaster/createRequestMaster";

export default function Page() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)

    const [api, contextHolder] = notification.useNotification();

    // useEffect(() => {
    //     if (hasCookie("requestMasterUid")) {
    //         router.push("/dashboard/request/laboratory")
    //     }
    // })

    const openNotification = (placement: NotificationPlacement, type: IconType, msg: string) => {
        api.open({
            type: type,
            message: msg,
            placement,
        });
    };

    const onFinish = async (values: RequestMasterForm) => {

        let data: RequestMaster = {
            ...values,
            fileName: values.fileName?.file.name,
        };

        await createRequestMaster(data, setIsLoading, () => {
                openNotification("top", "success", "شرح فرایند با موفقیت ثبت شد.")
                setTimeout(() => {
                    router.push("/dashboard/request/laboratory")
                }, 1000);
            },
        )

    };


    return (
        <>
            {contextHolder}
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Form
                onFinish={onFinish}
                name="form_item_path"
                layout="vertical"
            >
                <Row gutter={32}>
                    <Col span={24}>
                        <Form.Item rules={[{required: true, message: "لطفا فیلد را وارد نمایید"}]}
                                   name="processDescription" label="شرح فرآیند تولید">
                            <Input.TextArea
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: "none",
                                }}
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="mt-3" gutter={32}>
                    <Col span={24}>
                        <Form.Item name="fileName" label="نمودار شماتیک فرآیند">
                            <Upload
                                multiple={false}
                                maxCount={1}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                className="w-full"
                            >
                                <Button icon={<UploadOutlined/>}>بارگزاری نمایید</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider/>
                <div className="flex gap-6">
                    <Button
                        loading={isLoading}
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                         <span className="flex gap-3 justify-center ">
                                ذخیره و ادامه
                        </span>
                    </Button>
                </div>
            </Form>
        </>
    );
}

export type RequestMaster = {
    processDescription: string;
    fileName: string;
};

type RequestMasterForm = {
    processDescription: string;
    fileName: { file: { name: string } };
};
