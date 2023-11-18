import { Button, Col, Form, Input, Modal, Radio, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import useSWRMutation from 'swr/mutation';
import { mutationFetcher } from '../../../../../../../../lib/server/mutationFetcher';

export default function CreateModal({
    mutate,
    setIsModalVisible,
    isModalVisible,
}: {
    isModalVisible: any;
    setIsModalVisible: any;
    mutate: () => void;
}) {

    const { isMutating, trigger } = useSWRMutation(
        "/ProducerMixTank/Create_Producer",
        mutationFetcher
    );

    const [form] = useForm();

    const handleFormSubmit = async (values: any) => {
        await trigger(values);

        await mutate();

        setIsModalVisible(false);

        form.resetFields();
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Modal
                width={800}
                title="افزودن مخزن"
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
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
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancel}
                                key={"cancel"}
                            >
                                انصراف
                            </Button>
                        </Col>
                    </Row>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ licenseType: false }}
                    onFinish={handleFormSubmit}
                    disabled={isMutating}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="shape"
                                label="شکل مخزن"
                                rules={[{ required: true }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />

                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="height"
                                label="ارتفاع (متر)"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    className="w-full rounded-lg"
                                    size="large"
                                    placeholder="وارد کنید"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="environment"
                                label="محیط (متر)"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    className="w-full rounded-lg"
                                    size="large"
                                    placeholder="وارد کنید"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="volume"
                                label="حجم (متر مکعب)"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="outletPipe"
                                label="لوله خروجی مخزن (اینچ)"
                                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="outletPipeElectroPump"
                                label="الکترو پمپ لوله خروجی(اسب بخار)"
                                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="inletFlowRate"
                                label="دبی ورودی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="outputFlowRate"
                                label="دبی خروجی"
                                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                                label="تاییدیه کارگروه استاندارد سازی"
                                name="hasConfirmation"
                            >
                                <Radio.Group
                                    size='large'
                                    defaultValue={false}
                                    className='w-full my-1 text-center'
                                    value={form.getFieldValue("licenseType")}
                                    buttonStyle="solid"
                                    onChange={(e: any) => form.setFieldsValue({ licenseType: e.target.value })}
                                >
                                    <Radio.Button value={true} className='w-1/2'>دارد</Radio.Button>
                                    <Radio.Button value={false} className='w-1/2'>ندارد</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
