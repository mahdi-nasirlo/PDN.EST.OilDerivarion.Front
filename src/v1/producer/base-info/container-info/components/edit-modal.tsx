import { Button, Col, Form, Input, Modal, Radio, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { mutationFetcher } from '../../../../../../lib/server/mutationFetcher';
import useSWR from 'swr';
import { listFetcher } from '../../../../../../lib/server/listFetcher';

export default function EditModal({
    mutate,
    recordToEdit,
    setRecordToEdit,
    isEditModalVisible,
    setIsEditModalVisible,
}: {
    mutate: () => void;
    recordToEdit: any | null;
    setRecordToEdit: (arg: any | null) => void;
    isEditModalVisible: boolean;
    setIsEditModalVisible: (arg: boolean) => void;
}) {

    const [form] = useForm();

    const { isMutating, trigger } = useSWRMutation(
        "/ProducerMixTank/Update_Producer",
        mutationFetcher
    );

    const handleSubmit = async (values: any) => {
        values.Uid = data?.Uid;

        await trigger(values);

        await mutate();

        setIsEditModalVisible(false);

        setRecordToEdit(null);
    };

    const { data, isLoading } = useSWR(
        ["/ProducerMixTank/Get", { uid: recordToEdit?.Uid }],
        ([url, arg]) => listFetcher(url, { arg })
    );

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };


    return (
        <>
            <Modal
                width={800}
                title="ویرایش مخزن"
                open={isEditModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
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
                        <Col xs={12} md={12}>
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
                    disabled={isMutating}
                    onFinish={handleSubmit}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="Shape"
                                label="شکل مخزن"
                                rules={[{ required: true }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="Height"
                                label="ارتفاع (متر)"
                                rules={[{ required: true }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="Environment"
                                label="محیط (متر)"
                                rules={[{ required: true }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="Volume"
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
                                name="OutletPipe"
                                label="لوله خروجی مخزن (اینچ)"
                                rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="OutletPipeElectroPump"
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
                                name="InletFlowRate"
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
                                name="OutputFlowRate"
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
                                name="HasConfirmation"
                            >
                                <Radio.Group
                                    size='large'
                                    defaultValue={false}
                                    className='w-full my-1 text-center'
                                    value={form.getFieldValue("HasConfirmation")}
                                    buttonStyle="solid"
                                    onChange={(e: any) => form.setFieldsValue({ HasConfirmation: e.target.value })}
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
