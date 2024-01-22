"use client";

import { Button, Checkbox, Col, Divider, Form, Row } from "antd";
import React, { useContext } from "react";
import { useForm } from "antd/es/form/Form";
import GodOfDataViewer from "../../../../../../../components/GodOfDataViewer";
import useGetPreview from "../../../../../../../hooks/producer/useGetPreview";
import StepContext from "../../state-managment/step-context";

export default function Step5() {

    const processController = useContext(StepContext);

    const getInfo = useGetPreview()

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
            <GodOfDataViewer steps={false} uid={null as any} data={getInfo.data || {}} loading={getInfo.isLoading} />
            <Divider />
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
                <Row gutter={[12, 12]}>
                    <Col xs={24} md={12}>
                        <Button
                            size="large"
                            onClick={() => processController.dispatch({ type: "PREVIOUS" })}
                            type="dashed"
                            className="bg-gray-100 w-full"
                        >
                            مرحله قبلی
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            className="w-full "
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            ذخیره و ادامه
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
