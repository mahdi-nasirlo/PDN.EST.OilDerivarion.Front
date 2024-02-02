import React from 'react'
import ProductCategoryForm from './product-category-form'
import { Button, Col, Form, Modal, Row } from 'antd'
import useProductCategoryEdit
    from "@/app/(dashboard)/(admin-panel)/basic_product_category_list/hook/use-product-category-edit";

interface TProps {
    editModalUid: any
    setEditModalUid: (arg: any) => void
}

export default function EditModal({ editModalUid, setEditModalUid }: TProps) {

    const {
        closeModal,
        form,
        rules,
        update,
        get,
        handleSubmit,
        density
    } = useProductCategoryEdit(editModalUid, setEditModalUid)

    return (
        <>
            <Modal
                width={800}
                title="ویرایش دسته بندی محصول"
                open={editModalUid}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                loading={get.isFetching || update.isPending}
                                disabled={get.isFetching || update.isPending}
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
                                loading={get.isFetching || update.isPending}
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
                    onFinish={handleSubmit}
                    disabled={get.isFetching || update.isPending}
                    form={form}
                    layout="vertical"
                >
                    <ProductCategoryForm rules={rules} density={density} />
                </Form>
            </Modal>
        </>
    )
}
