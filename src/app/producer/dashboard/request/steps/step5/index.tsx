"use client";

import {Button, Checkbox, Descriptions, Divider, Form, Typography} from "antd";
import React, {useContext} from "react";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";

export default function Step6() {
    const processController = useContext(StepContext);

    const handleSubmit = () => {
        processController.dispatch({
            type: "GET_STEP",
            stepNumber: 6,
            step: 5,
        });
    };
    return (
        <>
            {/* <div className="box-border w-full lg:mt-8 lg:p-6 p-2 mt-3"> */}
            <Typography className="text-right font-medium text-base">
                اطلاعات تجهیزات آزمایشگاهی
            </Typography>
            <Divider/>
            <div className='w-full bg-gray-50 rounded-md p-5'>
                <Descriptions className="text-right" title="اطلاعات تجهیزات آزمایشگاه در این بخش قرار خواهد گرفت">
                    <Descriptions.Item label="تقطیر اتمسفریک">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="تقطیر در خلاء">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="نقطه ریزش">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="خوردگی فلز">
                        <span></span>
                    </Descriptions.Item>
                    <Descriptions.Item label="TAN (تست اسیدی)">
                        <span></span>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Divider/>
            <Form onFinish={handleSubmit}>
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
            {/* </div> */}
        </>
    );
}
