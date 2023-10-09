import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function EditModal({ isEditModalVisible, setIsEditModalVisible }:
    { isEditModalVisible: any, setIsEditModalVisible: any }
) {

    const [form] = useForm();

    const onFinish = async (values: any) => {

        console.log(values);

    };


    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };

    return (
        <>
            <Modal
                width={800}
                title="افزودن اطلاعات مدیریتی"
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
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="نام و نام خانوادگی"
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
                                name="lastName"
                                label="کد ملی / کد اتباع"
                                rules={[
                                    { required: true, message: "کد ملی اجباری است" },
                                    {
                                        validator: (_, value) => {
                                            if (!value || value.length === 10) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("کد ملی باید ۱۰ رقم باشد");
                                        },
                                    },
                                ]}
                            >
                                <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="تاریخ تولد"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string" },
                                ]}
                            >
                                <DatePicker
                                    className="w-full"
                                    placeholder="13**/**/**"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="سمت"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string" },
                                ]}
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={"phone_number"}
                                label="شماره تماس"
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
            </Modal >
        </>
    )

}
