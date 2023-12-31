"use client";

import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import MaterialForm from "./material-form";
import useCreateMaterial from "../../../../../hooks/material/useCreateMaterial";

export default function CreateModal({
    modalVisible,
    setModalVisible,
    mutate,
}: {
    modalVisible: any;
    setModalVisible: any;
    mutate: () => void;
}) {
    const [form] = useForm();

    const createMaterialRequest = useCreateMaterial()

    const createMaterial = async (values: any) => {

        const res = await createMaterialRequest.trigger(values);

        if (res?.success) {

            await mutate();

            await setModalVisible(false);

            form.resetFields();
        };
    };

    const CloseModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">افزودن ماده اولیه</div>
                    <div className="font-normal text-sm">
                        لطفا اطلاعات را وارد نمایید.
                    </div>
                </div>
            }
            open={modalVisible}
            onCancel={CloseModal}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            loading={createMaterialRequest.isMutating}
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={() => form.submit()}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            disabled={createMaterialRequest.isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={CloseModal}
                            key={"cancel"}
                            htmlType="reset"
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                disabled={createMaterialRequest.isMutating}
                onFinish={createMaterial}
                form={form}
                layout="vertical"
                initialValues={{ testItems: [] }}
            >
                <MaterialForm />
            </Form>
        </Modal >
    );
}
