import { Button, Col, Form, Input, Modal, Row } from 'antd'
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
                title="ویرایش اطلاعات تماس"
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
                                label="استان "
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string" },
                                ]}
                            >
                                <Input size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="شهرستان"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string" },
                                ]}
                            >
                                <Input size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="company-registratuon-num"
                                label="شهرک"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="license-establish"
                                label="خیابان اصلی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="operation-license"
                                label="خیابان فرعی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={"phone_number"}
                                label="کوچه"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="operation-license"
                                label="نشانی دفتر مرکزی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="operation-license"
                                label="تلفن دفتر مرکزی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "number", message: "باید به صورت عدد باشد" },
                                ]}
                            >
                                <Input className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={"phone_number"}
                                label="تلفن تماس کارخانه"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "number", message: "باید به صورت عدد باشد" },
                                ]}
                            >
                                <Input className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
