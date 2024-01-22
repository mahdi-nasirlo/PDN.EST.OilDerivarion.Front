import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function CreateModal({
    mutate,
    setIsModalVisible,
    isModalVisible,
}: {
    isModalVisible: any;
    setIsModalVisible: any;
    mutate: () => void;
}) {
    const [form] = useForm();

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
                        {/* <Col xs={12} md={12}>
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
                        </Col> */}
                        <Col xs={12} md={12}>
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
                {/*<FormBuilder items={data as any} loading={loadingForm} />*/}
            </Modal >
        </>
    )
}
