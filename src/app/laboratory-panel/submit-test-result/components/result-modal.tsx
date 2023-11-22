"use client";

import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import React from "react";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";

export default function ResultModal({
                                        setModalVisible,
                                        modalVisible,
                                    }: {
    setModalVisible: any;
    modalVisible: any;
}) {
    const [form] = useForm();

    const {trigger, isMutating} = useSWRMutation(
        "/TestItem/Create",
        mutationFetcher
    );

    // const createTestFactor = async (values: CreateTestItem) => {
    //
    //     const res = await trigger(values);
    //
    //     await mutate();
    //     if (res) {
    //         setModalVisible(false);
    //
    //         form.resetFields();
    //     }
    // };

    const CloseModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">نتیجه آزمون</div>
                    <div className="font-normal text-sm">
                        اطلاعات را وارد کنید.
                    </div>
                </div>
            }
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            loading={isMutating}
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={() => form.submit()}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            disabled={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={CloseModal}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                disabled={isMutating}
                // onFinish={createTestFactor}
                form={form}
                layout="vertical"
            >
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            name="name"
                            label="روش آزمون"
                            rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        >
                            <Select
                                loading={false}
                                showSearch
                                // @ts-ignore
                                filterOption={false}
                                // options={false}
                                fieldNames={{value: "Uid", label: "Name"}}
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="reNewabillity_Value"
                            label="فاکتور آزمون"
                            rules={[
                                {required: true, message: "لطفا مقدار را وارد کنید"},
                                {type: "number", message: "لطفا مقدار عددی وارد کنید"},
                            ]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="reNewabillity_Value"
                            label=" نتیجه آزمون"
                            rules={[
                                {required: true, message: "لطفا مقدار را وارد کنید"},
                                {type: "number", message: "لطفا مقدار عددی وارد کنید"},
                            ]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            name="measureUid"
                            label="حدود قابل قبول"
                            rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        >
                            <Select
                                loading={false}
                                showSearch
                                // @ts-ignore
                                filterOption={false}
                                // options={false}
                                fieldNames={{value: "Uid", label: "Name"}}
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>

                        <Form.Item
                            name="measureUid"
                            label="واحد اندازه گیری"
                            rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        >
                            <Select
                                loading={false}
                                showSearch
                                // @ts-ignore
                                filterOption={false}
                                // options={false}
                                fieldNames={{value: "Uid", label: "Name"}}
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>


                    <Col xs={24} md={12}>
                        <Form.Item
                            name="reNewabillity_Value"
                            label="تجدید پذیری"
                            rules={[
                                {required: true, message: "لطفا مقدار را وارد کنید"},
                                {type: "number", message: "لطفا مقدار عددی وارد کنید"},
                            ]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="reNewabillity_Value"
                            label="واحد تجدید پذیری"
                            rules={[
                                {required: true, message: "لطفا مقدار را وارد کنید"},
                                {type: "number", message: "لطفا مقدار عددی وارد کنید"},
                            ]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    );
}
