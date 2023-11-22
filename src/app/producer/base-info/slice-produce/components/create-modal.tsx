import { Button, Col, Form, Input, Modal, Radio, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function CreateModal({
    setIsEditModalVisible,
    isEditModalVisible,
}: {
    isEditModalVisible: any;
    setIsEditModalVisible: any;
}) {

    const [form] = useForm();

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };

    return (
        <>
            <Modal
                width={800}
                title="افزودن خط تولید برش گیری"
                open={isEditModalVisible}
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
                                key={"submit"}
                            >
                                ثبت
                            </Button>
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelEdit}
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
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="exporter"
                                label="شکل مخزن"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    // loading={ldLicenseTypeGetAll}
                                    // options={LicenseTypeGetAll}
                                    // fieldNames={{ value: "Id", label: "Name" }}
                                    size="large"
                                    placeholder="انتخاب کنید"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="issueDatePersian"
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
                                name="expirationDatePersian"
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
                                name="name"
                                label="حجم (متر مکعب)"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Select
                                    // loading={ldLicenseTypeGetAll}
                                    // options={LicenseTypeGetAll}
                                    // fieldNames={{ value: "Id", label: "Name" }}
                                    size="large"
                                    placeholder="انتخاب کنید"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="number"
                                label="لوله خروجی مخزن (اینچ)"
                                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="licenseTypeId"
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
                                name="name"
                                label="دبی ورودی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Select
                                    // loading={ldLicenseTypeGetAll}
                                    // options={LicenseTypeGetAll}
                                    // fieldNames={{ value: "Id", label: "Name" }}
                                    size="large"
                                    placeholder="انتخاب کنید"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="number"
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
                                name="licenseType"
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
