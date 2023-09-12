"use client";

import {Button, Col, Divider, Form, Input, Row, Typography, Upload,} from "antd";
import React from "react";
import {UploadOutlined} from "@ant-design/icons";
import useSWRMutation from "swr/mutation";
import {useRouter} from "next/navigation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";

export default function Page() {

    const router = useRouter()

    const {trigger, isMutating} = useSWRMutation("/RequestMaster/Create", mutationFetcher)

    const onFinish = async (values: RequestMasterForm) => {

        let data: RequestMaster = {
            ...values,
            fileName: values.fileName?.file.name,
        };

        // @ts-ignore
        const res = await trigger(data)


        router.push("/dashboard/request/laboratory")

    };


    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Form
                disabled={isMutating}
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
                        loading={isMutating}
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ذخیره و ادامه
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
