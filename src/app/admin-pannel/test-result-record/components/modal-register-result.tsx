import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    TestDescriptionFeature: string;
    TestMethod: string;
    TestResult: string;
    AcceptableRange: string;
    UnitOfMeasurement: string;
    Renewability: string;
    RenewableUnit: string;
}


export default function ModalRegisterResult(
    { recordToEdit, setRecordToEdit, setIsEditModalVisible, isEditModalVisible }: {
        setIsEditModalVisible: (arg: boolean) => void;
        isEditModalVisible: boolean;
        recordToEdit: DataType | null;
        setRecordToEdit: (arg: DataType | null) => void,
    }) {

    const [form] = useForm()

    const handleSubmit = (values: any) => {
        console.log("values", values);
    };

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };


    return (
        <>
            <Modal
                width={800}
                title={<div>
                    <div className="text-base mb-2">نتیجه آزمون</div>
                    <div className="font-normal text-sm">اطلاعات را وارد کنید</div>
                </div>} visible={isEditModalVisible}
                onOk={() => setIsEditModalVisible(true)}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full"
                                // loading={isLoading || isMutating}
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
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="title" label="ویژگی شرح آزمون">
                                <Input size="large" placeholder="وارد کنید" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="title" label="روش آزمون">
                                <Select size='large' placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="is_Active" label="نتیجه آزمون" >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="referenceCode" label="حدود قابل قبول">
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="is_Active" label="واحد اندازه گیری" >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="referenceCode" label="تجدید پذیری">
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="referenceCode" label="واحد تجدید پذیری">
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
