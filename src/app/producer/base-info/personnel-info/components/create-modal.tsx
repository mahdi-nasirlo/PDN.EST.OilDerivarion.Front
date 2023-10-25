import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import { SetEmployeeMember } from '../../../../../../interfaces/Base-info';
import { mutationFetcher } from '../../../../../../lib/server/mutationFetcher';
import useSWRMutation from "swr/mutation";


export default function CreateModal({ isEditModalVisible, setIsEditModalVisible, mutate }:
    { isEditModalVisible: any, setIsEditModalVisible: any, mutate: () => void }
) {

    const [form] = useForm();

    const { trigger, isMutating } = useSWRMutation("/Producer/SetEmployeeMember", mutationFetcher)

    const onFinish = async (values: SetEmployeeMember) => {

        const res = await trigger(values);

        await mutate();
        if (res) {

            setIsEditModalVisible(false);

            form.resetFields();
        }
    };

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };


    return (
        <>
            <Modal
                width={800}
                title="افزودن اطلاعات پرسنلی"
                visible={isEditModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                loading={isMutating}
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
                                name="name"
                                label="نام"
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
                                label="نام خانوادگی"
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
                                name="nationalCode"
                                label="کد ملی / کد اتباع"
                                rules={[{ required: true, message: "کد ملی اجباری است" },]}
                            >
                                <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="birthDate" label="تاریخ تولد">
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
                            <Form.Item
                                name="currentMobile"
                                label="شماره تماس"
                                rules={[{ required: true, message: "این فیلد اجباری است" },]}
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
