"use client";

import { Button, Col, Form, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import MaterialForm from "@/app/admin-pannel/adding-raw-material/components/material-form";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";

export default function CreateModal({ modalVisible, setModalVisible, mutate }: {
    modalVisible: any,
    setModalVisible: any,
    mutate: () => void
}) {

    const [form] = useForm()


    const { isMutating, trigger } = useSWRMutation("/Material/Create", mutationFetcher)

    const createMaterial = async (values: Material) => {

        await trigger(values)

        await mutate()

        setModalVisible(false)

    }


    return (
        <Modal
            width={800}
            title={<div>
                <div className="text-base mb-2">افزودن ماده اولیه</div>
                <div className="font-normal text-sm">لطفا اطلاعات را وارد نمایید.</div>
            </div>}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
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
                            key={"cancel"}
                            htmlType="reset"
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Form disabled={isMutating} onFinish={createMaterial} form={form} layout='vertical'>
                <MaterialForm />
            </Form>
        </Modal>)
}
