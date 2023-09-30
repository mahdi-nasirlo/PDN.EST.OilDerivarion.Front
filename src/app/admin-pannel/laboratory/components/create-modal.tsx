"use client";

import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import LaboratoryForm from "./laboratory-form";

export default function CreateModal({
    modalVisible,
    setModalVisible,
    mutate,
}: {
    modalVisible: any;
    setModalVisible: any;
    mutate: () => void;
}) {

    const [form] = useForm();

    const { isMutating, trigger } = useSWRMutation(
        "/Lab/Create",
        mutationFetcher
    );

    const CreateLaboratory = async (values: Labratory) => {

        await trigger(values)

        await mutate();

        setModalVisible(false);

        form.resetFields();

    };



    const [step, setStep] = useState(1);

    const [data, setData] = useState({});

    const handleNextStep = useCallback(
        (data: any) => {
            if (step < 3) {
                setData(data);
                setStep(step + 1);
            }
        },
        [step]
    );

    const handlePrevStep = useCallback(
        (data: any) => {
            if (step > 1) {
                setData(data);
                setStep(step - 1);
            }
        },
        [step]
    );


    const handleSubmit = useCallback((data: any) => {
        setData(data);
        console.log("Data", data);
    }, []);


    return (
        <Modal
            width={800}
            title={
                <div>
                    <>
                        <div className="text-base mb-2 flex gap-2">
                            افزودن آزمایشگاه جدید
                            <h2>{step} از 3</h2>
                        </div>
                        <div className="text-xs font-normal">
                            {step === 1 && <Typography>مشخصات آزمایشگاه</Typography>}
                            {step === 2 && <Typography>مشخصات فرد مسئول</Typography>}
                            {step === 3 && <Typography>مشخصات مدیر</Typography>}
                        </div>
                    </>
                </div>
            }
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            size="large"
                            className="w-full"
                            type="primary"
                            // onClick={() => form.submit()}
                            onClick={handleNextStep}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            loading={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            // onClick={() => setModalVisible(false)}
                            onClick={handlePrevStep}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form form={form} onFinish={CreateLaboratory} layout="vertical">
                <>
                    <div>
                        {step === 1 && <LaboratoryForm />}
                        {step === 2 &&
                            <>
                                <Row gutter={[32, 1]}>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="Name" label="نام">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="lastName" label="نام خانوادگی">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 1]}>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="code" label="کد ملی">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="phone" label="شماره موبایل">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        }
                        {step === 3 &&
                            <>
                                <Row gutter={[32, 1]}>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="Name" label="نام">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="lastName" label="نام خانوادگی">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[32, 1]}>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="code" label="کد ملی">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item name="phone" label="شماره موبایل">
                                            <Input disabled size="large" placeholder="وارد کنید" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        }
                    </div>
                </>
            </Form>
        </Modal>
    );
}