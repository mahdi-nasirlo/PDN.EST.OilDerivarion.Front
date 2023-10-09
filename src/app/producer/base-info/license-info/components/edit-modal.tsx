import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function EditModal(
    { isEditModalVisible, setIsEditModalVisible }:
        { isEditModalVisible: any, setIsEditModalVisible: any }
) {
    const [form] = useForm();


    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };


    return (
        <>
            <Modal
                width={800}
                title="ویرایش اطلاعات مجوز"
                visible={isEditModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                // loading={isMutating}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelEdit}
                                key={"cancel"} >
                                انصراف
                            </Button >
                        </Col>
                    </Row>
                ]}
            >
                <Form name="form_item_path" layout="vertical" form={form}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="year-establishment"
                                label="نام مجوز"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "number", message: "باید به صورت عدد باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="تاریخ دریافت ">
                                <DatePicker
                                    className="w-full"
                                    placeholder="13**/**/**"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="company-registratuon-num" label="تاریخ اعتبار">
                                <DatePicker
                                    className="w-full"
                                    placeholder="13**/**/**"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
