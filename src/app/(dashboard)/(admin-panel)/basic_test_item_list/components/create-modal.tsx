import React from 'react'
import { Button, Col, Form, Modal, Row } from 'antd';
import { TestItemApi } from 'constance/test-item';
import { useValidation } from '@/hooks/use-validation';
import TestItemForm from './test-item-form';

const formSchema = TestItemApi.BasicTestItemCreate.type

export default function CreateModal({ modalVisible, setModalVisible }: any) {

    const [form, rules] = useValidation(formSchema);

    const closeModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">افزودن فاکتور آزمون</div>
                    <div className="font-normal text-sm">
                        لطفا اطلاعات را وارد نمایید.
                    </div>
                </div>
            }
            open={modalVisible}
            onCancel={closeModal}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            onClick={() => form.submit()}
                            size="large"
                            className="w-full"
                            type="primary"
                            key={"submit"}
                        // loading={isMutating}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            // loading={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={closeModal}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                // onFinish={handleFormSubmit}
                // disabled={isMutating}
                form={form}
                layout="vertical"
            >
                <TestItemForm rules={rules} />

            </Form>
        </Modal>
    )
}
