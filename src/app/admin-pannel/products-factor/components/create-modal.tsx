"use client";

import {Button, Col, Form, Modal, Row, Select,} from "antd";
import React from "react";
import {useForm} from "antd/es/form/Form";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {Product} from "../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";

export default function CreateModal({
                                        setModalVisible,
                                        modalVisible,
                                        mutate
                                    }: {
    setModalVisible: any;
    modalVisible: any;
    mutate: () => void
}) {

    const [form] = useForm()

    const defaultValue = {
        "name": "",
        "is_Active": true
    }

    const {
        data: Product,
        isLoading: ldProduct
    } = useSWR<Product[]>(["/Product/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))

    const {
        data: TestItem,
        isLoading: ldTestProduct
    } = useSWR(["/TestItem/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))

    const {trigger, isMutating} = useSWRMutation("/ProductTestItem/Create", mutationFetcher)

    const handleFormSubmit = async (values: { "productUid": string, "testItemUid": string }) => {

        setModalVisible(false)

        form.resetFields()

        await trigger({...values, is_Active: true})

        await mutate();


    }

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2"> افزودن فاکتور محصول</div>
                    <div className="font-normal text-sm">
                        لطفا اطلاعات را وارد نمایید.
                    </div>
                </div>
            }
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            onClick={() => {
                                form.submit();
                            }}
                            size="large"
                            className="w-full"
                            type="primary"
                            key={"submit"}
                            loading={isMutating}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => setModalVisible(false)}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                onFinish={handleFormSubmit}
                disabled={isMutating}
                form={form}
                layout="vertical"
            >
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="productUid"
                            label="نام محصول"
                            rules={[
                                {
                                    required: true,
                                    message: "لطفا مقدار را وارد کنید",
                                },
                            ]}
                        >
                            <Select showSearch fieldNames={{value: "Uid", label: "FullName"}}
                                    loading={ldProduct} options={Product}
                                    size="large" placeholder="انتخاب کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="testItemUid"
                            label="نام فاکتور"
                            rules={[
                                {
                                    required: true,
                                    message: "لطفا مقدار را وارد کنید",
                                },
                            ]}
                        >
                            <Select
                                options={TestItem}
                                loading={ldTestProduct}
                                fieldNames={{value: "Uid", label: "Name"}}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
