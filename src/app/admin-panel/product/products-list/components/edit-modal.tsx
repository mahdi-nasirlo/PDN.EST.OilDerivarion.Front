import React, { useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from "antd";
import ProductForm from "@/app/admin-panel/product/products-list/components/product-form";
import { useForm } from "antd/es/form/Form";
import { Product } from "../../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";

function EditModal({ isEditModalVisible, setIsEditModalVisible, mutate, recordToEdit }: {
    mutate: () => void,
    recordToEdit: Product | null,
    isEditModalVisible: boolean,
    setIsEditModalVisible: (arg: boolean) => void
}) {

    const [form] = useForm()

    const { trigger, isMutating } = useSWRMutation("/Product/Update", mutationFetcher)

    const updateProduct = async (values: Product) => {

        values.Uid = recordToEdit?.Uid

        await trigger(values)

        await mutate()

        setIsEditModalVisible(false)

        form.resetFields();

    }

    useEffect(() => {
        console.log(recordToEdit);

        form.setFieldsValue(recordToEdit)
    }, [recordToEdit])



    return (
        <Modal
            width={800}
            title="ویرایش محصول"
            open={isEditModalVisible}
            onOk={() => form.submit()}
            onCancel={() => setIsEditModalVisible(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            loading={isMutating}
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={() => form.submit()}
                            key={"submit"}>
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            loading={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => setIsEditModalVisible(false)}
                            key={"cancel"}>
                            انصراف
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Form disabled={isMutating} form={form} onFinish={updateProduct} layout='vertical'>
                <ProductForm />
            </Form>
        </Modal>
    );
}

export default EditModal;