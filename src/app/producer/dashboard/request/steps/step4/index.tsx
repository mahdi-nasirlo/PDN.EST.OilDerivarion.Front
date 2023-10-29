"use client";

import {Button, Checkbox, Descriptions, Divider, Form, Typography} from "antd";
import React, {useContext} from "react";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import {useForm} from "antd/es/form/Form";

export default function Step5() {
    const processController = useContext(StepContext);

    const handleSubmit = () => {
        processController.dispatch({
            type: "GET_STEP",
            stepNumber: 6,
            step: 4,
        });
    };

    const [form] = useForm();
    return (
        <>
            <Typography className="text-right font-medium text-base">
                اطلاعات واحد تولیدی
            </Typography>
            <Divider/>
            <div className='w-full bg-gray-50 rounded-md p-5'>
                <Descriptions className="text-right" title="اطلاعات واحد تولید در این بخش قرار خواهد گرفت">
                    <Descriptions.Item label="نام مدیر عامل">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="نام خانوادگی مدیر عامل">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="شناسه ملی">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="نام واحد تولیدی">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="نوع مالکیت">
                        <span></span>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Divider/>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    className=" mr-3 my-6  font-medium"
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                        new Error("پذیرش اطلاعات فوق ضروری می باشد")
                                    ),
                        },
                    ]}
                >
                    <Checkbox>اطلاعات فوق را تایید میکنم.</Checkbox>
                </Form.Item>
                <div className="flex gap-3">
                    <Button
                        onClick={() => processController.dispatch({type: "PREVIOUS"})}
                        type="dashed"
                        className="bg-gray-100 w-full"
                    >
                        مرحله قبلی
                    </Button>
                    <Button
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
