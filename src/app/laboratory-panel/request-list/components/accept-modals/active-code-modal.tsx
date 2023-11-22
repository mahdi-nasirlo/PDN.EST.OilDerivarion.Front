import React, { useState } from 'react';
import { Button, Col, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import ReceivePasswordForm from './receive-password-form';
import SmsCodeForm from './sms-code-form';
import { useRouter } from 'next/navigation';

function ActiveCodeModal(
    {
        recordUid,
        isModalOpen,
        setIsModalOpen,
    }: {
        recordUid: any;
        isModalOpen: boolean;
        setIsModalOpen: (arg: boolean) => void;
    }
) {

    const [form] = useForm();
    const router = useRouter();

    const [openBox, setOpenBox] = useState(false);

    const handleCancel = () => {
        setOpenBox(false);
        setIsModalOpen(false);
    }

    const handelReceivePassword = (values: any) => {
        setOpenBox(true);
        form.resetFields();
    }


    const handelSmsCode = (values: any) => {
        console.log(recordUid);

        setOpenBox(false);
        setIsModalOpen(false);
        form.resetFields();
        router.push(`/laboratory-panel/request-list/test-result-lab/${recordUid}`);
    }

    return (
        <Modal
            width={600}
            title={<div>
                <div className="text-base mb-2">باز کردن درب جعبه</div>
                {openBox ?
                    <div className="font-normal text-sm">جهت باز کردن درب جعبه، لطفا کد پبامک شده را وارد نمایید</div>
                    :
                    <div className="font-normal text-sm">جهت دریافت رمز، لطفا کد بارکد را وارد نمایید.</div>
                }
            </div>}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                openBox ?
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24}>
                            <Button
                                onClick={() => form.submit()}
                                className="w-full"
                                type="primary"
                            >
                                باز کردن درب جعبه
                            </Button>
                        </Col>
                    </Row>
                    :
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24}>
                            <Button
                                onClick={() => form.submit()}
                                className="w-full"
                                type="primary"
                            >
                                یافتن رمز عبور
                            </Button>
                        </Col>
                    </Row>
            ]}
        >
            {openBox ?
                <SmsCodeForm
                    form={form}
                    onFinish={handelSmsCode}
                />
                :
                <ReceivePasswordForm
                    form={form}
                    onFinish={handelReceivePassword}
                />
            }

        </Modal >
    );
}

export default ActiveCodeModal;