import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import useSWRMutation from 'swr/mutation';
import { mutationFetcher } from '../../../../../lib/server/mutationFetcher';

export default function RejectionModal(
    {
        recordUid,
        modalVisible,
        setModalVisible
    }: {
        recordUid: any;
        modalVisible: any,
        setModalVisible: any
    }
) {
    const [form] = useForm()

    const closeModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const { trigger, isMutating } = useSWRMutation(
        "/RequestMaster/UpdateLabOpinion",
        mutationFetcher
    );

    const handleFormSubmit = async (values: any) => {
        values.uid = recordUid
        const res = await trigger({ ...values, labIsAccepted: true });
        if (res) {
            setModalVisible(false);
        }
        form.resetFields();
    };

    return (
        <>
            <Modal
                width={600}
                title={<div>
                    <div className="text-base mb-2">عدم پذیرش</div>
                    <div className="font-normal text-sm">لطفا توضیحات مربوط به عدم پذیرش را وارد نمایید.</div>
                </div>}
                visible={modalVisible}
                onCancel={closeModal}
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
                                disabled={isMutating}
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={closeModal}
                                key={"cancel"} >
                                بازگشت
                            </Button >
                        </Col>
                    </Row>
                ]}
            >
                <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
                    <Row gutter={[32, 1]} >
                        <Col xs={24}>
                            <Form.Item
                                name="labRejectionDescription"
                                label='توضیحات'
                            >
                                <Input.TextArea
                                    className="mt-2"
                                    placeholder="وارد کنید"
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
