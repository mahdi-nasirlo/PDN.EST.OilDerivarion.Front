"use client";


import React, { useState } from "react";
import ReviewDataTable from "@/app/dashboard/request/final-preview/components/review-data-table";
import { Button, Checkbox, Divider, Form } from "antd";
import ReviewDataModalAcceptAgreement from "./components/review-data-modal-accept-agreement";
import ReviewDataModalFinalSubmit from "./components/review-data-modal-final-submit";


export default function Page() {

    const [form] = Form.useForm();

    const [modalVisibleConfirmation, setModalVisibleConfirmation] = useState(false);
    const [modalVisibleFinalSubmit, setModalVisibleFinalSubmit] = useState(false);

    const showModalConfirmation = () => {
        setModalVisibleConfirmation(true);
    };

    const showModalFinalSubmit = () => {
        setModalVisibleFinalSubmit(true);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        showModalFinalSubmit();
    };




    return (
        <>
            <ReviewDataTable />
            <Divider />
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
            >
                <Form.Item
                    className=" mr-3 my-6  font-medium"
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('پذیرش شرایط و قوانین برای ثبت درخواست ضروری می باشد')),
                        },
                    ]}
                >
                    <Checkbox>
                        شرایط و <Button type="link" className="text-primary-500 p-0" onClick={showModalConfirmation}>قوانین</Button> را خوانده و می پذیرم!
                    </Checkbox>
                </Form.Item>
                <Divider />
                <div className="flex gap-6">
                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        <span className="flex gap-3 justify-center ">ثبت</span>
                    </Button>
                </div>
            </Form>
            <ReviewDataModalAcceptAgreement
                modalVisibleConfirmation={modalVisibleConfirmation}
                setModalVisibleConfirmation={setModalVisibleConfirmation}
            />
            <ReviewDataModalFinalSubmit
                modalVisibleFinalSubmit={modalVisibleFinalSubmit}
                setModalVisibleFinalSubmit={setModalVisibleFinalSubmit}
            />
        </>
    );
}
