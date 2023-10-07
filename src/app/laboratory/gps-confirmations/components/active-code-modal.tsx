import React, {useState} from 'react';
import {Alert, Button, Col, Form, Input, Modal, Row} from "antd";
import {useForm} from "antd/es/form/Form";

function ActiveCodeModal({isModalOpen, setIsModalOpen}: {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void
}) {

    const [form] = useForm()

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    const showPassword = () => {

        setPasswordIsVisible(true)

    }

    return (
        <Modal footer={[
            <Row key={"box"} gutter={[16, 16]} className="my-2">
                <Col xs={24}>
                    <Button onClick={() => form.submit()} className="w-full" type="primary">یافتن رمز عبور</Button>
                </Col>
            </Row>]} title="اعلان" open={isModalOpen}
               onOk={() => setIsModalOpen(true)}
               onCancel={() => setIsModalOpen(false)}>
            <Form onFinish={showPassword} form={form}>
                <Form.Item labelCol={{span: 24}} label="کد بارکد" name="barcode"
                           rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}>
                    <Input/>
                </Form.Item>
            </Form>
            {passwordIsVisible && <Alert message="23423" type="info"/>}
        </Modal>
    );
}

export default ActiveCodeModal;