"use client"

import {Button, Col, Form, Modal, Row} from 'antd'
import {useForm} from 'antd/es/form/Form';
import React from 'react'
import TestFactorForm from "@/app/admin-pannel/test-factors/components/test-factor-form";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import {CreateTestItem} from "../../../../../interfaces/TestItem";

export default function CreateModal({setModalVisible, modalVisible, mutate}: {
    setModalVisible: any,
    mutate: () => void,
    modalVisible: any
}) {

    const [form] = useForm()

    const {trigger, isMutating} = useSWRMutation("/TestItem/Create", mutationFetcher)

    const createTestFactor = async (values: CreateTestItem) => {

        await trigger(values)

        await mutate()

        setModalVisible(false)

        form.resetFields()

    }

    return (
        <Modal
            width={800}
            title={<div>
                <div className="text-base mb-2">افزودن فاکتور جدید</div>
                <div className="font-normal text-sm">لطفا اطلاعات را وارد نمایید.</div>
            </div>}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
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
                            key={"submit"}>
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            loading={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => setModalVisible(false)}
                            key={"cancel"}>
                            انصراف
                        </Button>
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={handleFormSubmit}
                            key={"submit"} >
                            ثبت
                        </Button >
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={closeModal}
                            key={"cancel"} >
                            انصراف
                        </Button >
                    </Col>
                </Row>
            ]}
        >
            <Form disabled={isMutating} onFinish={createTestFactor} form={form}>
                <TestFactorForm/>
            </Form>
        </Modal>
            <Form form={form} layout='vertical'>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year"
                            label="نام فاکتور"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="years"
                            label="نام ماده اولیه"
                        >
                            <Select size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="yea"
                            label="نام محصول"
                        >
                            <Select size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year"
                            label="واحد تجدید پذیری "
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year"
                            label="روش آزمون"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}
