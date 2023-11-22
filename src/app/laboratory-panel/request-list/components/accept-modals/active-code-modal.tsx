import React, {useState} from 'react';
import {Button, Col, Modal, Row} from "antd";
import {useForm} from "antd/es/form/Form";
import {useRouter} from 'next/navigation';
import SmsCodeForm from "./sms-code-form"
import ReceivePasswordForm from "./receive-password-form"
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";

function ActiveCodeModal(
    {
        mutate,
        recordUid,
        isModalOpen,
        setIsModalOpen,
    }: {
        mutate: () => void
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

    const {trigger, isMutating} = useSWRMutation(
        "/RequestMaster/UpdateLabOpinion",
        mutationFetcher
    );

    const handleFormSubmit = async (values: any) => {
        values.uid = recordUid

        const res = await trigger({
            uid: recordUid,
            labIsAccepted: true
        });

        if (res) {
            setOpenBox(true);
        }

    };
    const {trigger: code, isMutating: pass} = useSWRMutation(
        "/RequestMaster/OpenBox",
        mutationFetcher
    );

    const handleFormSubmitCode = async (values: any) => {
        values.uid = recordUid

        const res = await code({
            uid: recordUid,
            code: "1234"
        });

        if (res) {
            mutate();
            setIsModalOpen(false);
            form.resetFields();
        }

    };


    const handelSmsCode = (values: any) => {
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
                                onClick={handleFormSubmitCode}
                                className="w-full"
                                type="primary"
                            >
                                باز کردن درب جعبه
                            </Button>
                        </Col>
                    </Row>
                    :
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12}>
                            <Button
                                loading={isMutating}
                                onClick={handleFormSubmit}
                                className="w-full"
                                type="primary"
                            >
                                تایید
                            </Button>
                        </Col>
                        <Col xs={12}>
                            <Button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full bg-gray-50"
                            >
                                انصراف
                            </Button>
                        </Col>
                    </Row>
            ]}
        >

            {openBox ?
                <SmsCodeForm
                    form={form}
                    onFinish={handleFormSubmitCode}
                />
                :
                <ReceivePasswordForm/>
            }
        </Modal >
    );
}

export default ActiveCodeModal;