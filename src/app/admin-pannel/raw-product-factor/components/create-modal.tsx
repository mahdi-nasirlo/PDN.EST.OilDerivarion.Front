"use client";

import {Button, Col, Form, Modal, Row, Select,} from "antd";
import React from "react";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import {useForm} from "antd/es/form/Form";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";

export default function CreateModal({
                                        setModalVisible,
                                        modalVisible,
                                        mutate
                                    }: {
    mutate: () => void;
    setModalVisible: any;
    modalVisible: any;
}) {

    const [form] = useForm()

    const defaultValue = {
        "name": "",
        "is_Active": null
    }

    const {
        data: material,
        isLoading: ldMaterial
    } = useSWR<Material[]>(["/Material/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))

    const {
        data: TestItem,
        isLoading: ldTestMaterial
    } = useSWR(["/TestItem/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))


    const {trigger, isMutating} = useSWRMutation("/MaterialTestItem/Create", mutationFetcher)

    const handleFormSubmit = async (values: { materialUid: string, testItemUid: string }) => {

        setModalVisible(false)

        await trigger({...values, is_Active: true})

        await mutate()

        form.resetFields()

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
                            name="materialUid"
                            label="نام ماده اولیه"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                },
                            ]}
                        >
                            <Select options={material} loading={ldMaterial} fieldNames={{value: "Uid", label: "Name"}}
                                    size="large"
                                    placeholder="انتخاب کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="testItemUid"
                            label="نام فاکتور"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                },
                            ]}
                        >
                            <Select
                                options={TestItem}
                                loading={ldTestMaterial}
                                size="large"
                                placeholder="انتخاب کنید"
                                fieldNames={{value: "Uid", label: "Name"}}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
