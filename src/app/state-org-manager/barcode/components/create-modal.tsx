"use client";

import { Button, Col, Form, Modal, Row, } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";
import BarcodeForm from "@/app/admin-panel/barcode/components/barcode-form";

export default function CreateModal({
    setModalVisible,
    modalVisible,
    mutate
}: {
    setModalVisible: any;
    modalVisible: any;
    mutate: () => void
}) {

    const [form] = useForm()

    const { trigger, isMutating } = useSWRMutation("/RequestBarcode/Create", mutationFetcher)

    const handleFormSubmit = async (values: any) => {

        await trigger(values)

        await mutate();

        setModalVisible(false)

        form.resetFields()
    }

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2"> افزودن بارکد</div>
                    <div className="font-normal text-sm">
                        لطفا اطلاعات را وارد نمایید.
                    </div>
                </div>
            }
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            onClick={() => {
                                form.submit();
                            }}
                            size="large"
                            className="w-full"
                            type="primary"
                            key={"submit"}
                            loading={isMutating}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => setModalVisible(false)}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                onFinish={handleFormSubmit}
                disabled={isMutating}
                form={form}
                layout="vertical"
            >
                <BarcodeForm form={form} />
            </Form>
        </Modal>
    );
}
