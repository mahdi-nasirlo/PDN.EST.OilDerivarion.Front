"use client";

import {Button, Col, Form, Modal, Row} from 'antd'
import {useForm} from 'antd/es/form/Form';
import React from 'react'
import BoxForm from "@/app/admin-panel/add-box/components/box-form";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";


export default function CreateModal({modalVisible, setModalVisible, mutate}: {
    modalVisible: any,
    setModalVisible: any,
    mutate: () => void
}) {

    const [form] = useForm()

    const {trigger, isMutating} = useSWRMutation("/GpsDevice/Create", mutationFetcher)

    const handleSubmit = async (values: { code: string, isActive: boolean, stateID: number }) => {

        const res = await trigger(values)

        if (res) {

            await mutate()

            setModalVisible(false)

            form.resetFields()
        }

    }

    return (
        <Modal
            width={800}
            title={<div>
                <div className="text-base mb-2">افزودن جعبه</div>
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
                            key={"cancel"}>
                            انصراف
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Form disabled={isMutating} form={form} onFinish={handleSubmit} layout="vertical">
                <BoxForm/>
            </Form>
        </Modal>
    )
}