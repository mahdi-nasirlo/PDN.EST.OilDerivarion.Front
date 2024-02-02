import React, { useEffect } from 'react'
import ProductCategoryForm from './product-category-form'
import { Button, Col, Form, Modal, Row } from 'antd'
import { productCategoryApi } from 'constance/product-category'
import { useValidation } from '@/hooks/use-validation'
import { useProductCategory } from '../hook/use-product-category'
import { z } from 'zod'

interface TProps {
    editModalUid: any
    setEditModalUid: (arg: any) => void
}

const formSchema = productCategoryApi.BasicProductCategoryUpdate.type

export default function EditModal({ editModalUid, setEditModalUid }: TProps) {

    const { get, update } = useProductCategory();

    useEffect(() => {
        if (get.data) form.setFieldsValue(get.data[0])
    }, [get.data]);

    const handleSubmit = async (
        data: z.infer<typeof productCategoryApi.BasicProductCategoryUpdate.type>
    ) => {
        const res = await update.mutateAsync({
            ...data,
            uid: editModalUid as string,
        });

        if (res.success) {
            setEditModalUid(undefined);
        }
    };

    const [form, rules] = useValidation(formSchema);


    const closeModal = () => {
        setEditModalUid(false);
        form.resetFields();
    };

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
                    onFinish={handleSubmit}
                    disabled={get.isLoading || get.isPending}
                    form={form}
                    layout="vertical"
                >
                    <ProductCategoryForm rules={rules} />
                </Form>
            </Modal>
        </>
    )
}
