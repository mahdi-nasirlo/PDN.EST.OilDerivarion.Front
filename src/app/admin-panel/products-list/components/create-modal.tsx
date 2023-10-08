"use client";

import {Button, Col, Form, Modal, Row} from 'antd'
import {useForm} from 'antd/es/form/Form';
import React from 'react'
import {ProductCreate} from "../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import ProductForm from "@/app/admin-panel/products-list/components/product-form";

export default function CreateModal({modalVisible, setModalVisible, mutate}: {
    modalVisible: any,
    setModalVisible: any,
    mutate: () => void
}) {

    const [form] = useForm()

    const {isMutating, trigger} = useSWRMutation("/Product/Create", mutationFetcher)

    const createProduct = async (values: ProductCreate) => {

        await trigger(values)

        await mutate()

        setModalVisible(false)

        form.resetFields()

    }


    return (
        <Modal
            width={800}
            title={<div>
                <div className="text-base mb-2">افزودن محصول جدید</div>
                <div className="font-normal text-sm">لطفا اطلاعات را وارد نمایید.</div>
            </div>}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            disabled={isMutating}
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
                            disabled={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => setModalVisible(false)}
                            key={"cancel"}>
                            انصراف
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Form disabled={isMutating} onFinish={createProduct} form={form}>
                <ProductForm/>
            </Form>
        </Modal >
    )
}
