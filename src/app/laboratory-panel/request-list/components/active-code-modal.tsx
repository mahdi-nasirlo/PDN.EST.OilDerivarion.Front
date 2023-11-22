import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";

function ActiveCodeModal({ isModalOpen, setIsModalOpen }: {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void
}) {

    const [form] = useForm();

    const [] = useState(false);

    const ReceivePassword = () => {
        setIsModalOpen(false);
        form.resetFields();
    }

    return (
        <Modal
            width={600}
            title={<div>
                <div className="text-base mb-2">باز کردن درب جعبه</div>
                <div className="font-normal text-sm">جهت دریافت رمز، لطفا کد بارکد را وارد نمایید.</div>
            </div>}
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24}>
                        <Button
                            onClick={() => form.submit()}
                            className="w-full"
                            type="primary"
                        >
                            یافتن رمز عبور
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Form onFinish={ReceivePassword} form={form} layout='vertical'>
                <Form.Item
                    label="شناسه جعبه"
                    name="barcode"
                    rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                >
                    <Input size='large' placeholder='وارد کنید' />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ActiveCodeModal;