"use client";

import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../../../lib/server/mutationFetcher";

export default function ResultModal({
    handleFormSubmit,
    setModalVisible,
    modalVisible,
}: {
    handleFormSubmit: any
    setModalVisible: any;
    modalVisible: any;
}) {
    const [form] = useForm();

    const { trigger, isMutating } = useSWRMutation(
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
                onFinish={handleFormSubmit}
                form={form}
                layout="vertical"
            >
                <Row gutter={[16, 16]}>

                    <Col xs={24} md={12}>
                        <Form.Item
                            name="result"
                            label="نتیجه"

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
                            name="range"
                            label="محدوده"

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
                            name="description"
                            label="توضیحات"

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
