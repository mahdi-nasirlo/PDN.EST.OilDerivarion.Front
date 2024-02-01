import React from 'react'
import { Button, Col, Form, Modal, Row } from 'antd'
import { TestItemApi } from 'constance/test-item'
import { useValidation } from '@/hooks/use-validation'
import TestItemForm from './test-item-form'

interface TProps {
    editModal: boolean
    setEditModal: (arg: boolean) => void
}

const formSchema = TestItemApi.BasicTestItemUpdate.type

export default function EditModal({ editModal, setEditModal }: TProps) {

    const [form, rules] = useValidation(formSchema);


    const closeModal = () => {
        setEditModal(false);
        form.resetFields();
    };

    return (
        <>
            <Modal
                width={800}
                title="ویرایش فاکتور آزمون"
                open={editModal}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                // loading={isLoading || isMutating}
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
                                // disabled={isLoading || isMutating}
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
                    // onFinish={handleSubmit}
                    // disabled={isLoading || isMutating}
                    form={form}
                    layout="vertical"
                >
                    <TestItemForm rules={rules} />
                </Form>
            </Modal>
        </>
    )
}
