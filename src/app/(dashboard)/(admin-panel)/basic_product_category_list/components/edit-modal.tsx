import React from 'react'
import ProductCategoryForm from './product-category-form'
import { Button, Col, Form, Modal, Row } from 'antd'
import { productCategoryApi } from 'constance/product-category'
import { useValidation } from '@/hooks/use-validation'

interface TProps {
    editModal: boolean
    setEditModal: (arg: boolean) => void
}

const formSchema = productCategoryApi.BasicProductCategoryUpdate.type

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
                title="ویرایش دسته بندی محصول"
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
                    <ProductCategoryForm rules={rules} />
                </Form>
            </Modal>
        </>
    )
}
