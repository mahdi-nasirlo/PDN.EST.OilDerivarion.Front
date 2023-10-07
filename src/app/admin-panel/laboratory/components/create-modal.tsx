"use client";

import {Button, Col, Modal, Row, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import React, {useCallback, useState} from "react";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import Step1 from "@/app/admin-panel/laboratory/components/forms/step1";
import Step2 from "@/app/admin-panel/laboratory/components/forms/step2";
import Step3 from "@/app/admin-panel/laboratory/components/forms/step3";

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

    const [labUid, setLabUid] = useState<string | undefined>()

    const handleNextStep = useCallback(
        () => {
            if (step < 3) {
                setStep(step + 1);
            }
        },
        [step]
    );

    const handlePrevStep = useCallback(
        () => {
            if (step > 1) {
                setStep(step - 1);
            }
        },
        [step]
    );

    const {trigger: createLab, isMutating: ldCreateLab} = useSWRMutation("/Lab/Create", mutationFetcher)

    const handleCreateLab = async (values: LabCreate) => {

        const res = await createLab(values)

        await mutate

        if (res?.Uid) {

            setLabUid(res.Uid)

            handleNextStep()

        }

    }

    const {
        trigger: saveFromResponsible,
        isMutating: ldSaveForm
    } = useSWRMutation("/Lab/SaveFormResponsible", mutationFetcher)


    const handleCreateSaveFormResponsible = async (values: SaveFormResponsible) => {

        values.uid = labUid

        const res = await saveFromResponsible(values)

        await mutate

        if (res === null) {

            handleNextStep()

        }

    }

    const {
        trigger: saveFormManager,
        isMutating: ldSaveFormManager
    } = useSWRMutation("/Lab/SaveFormManager", mutationFetcher)

    const handleSubmitFormManager = async (values: SaveFormManager) => {

        values.uid = labUid

        const res = await saveFormManager(values)

        await mutate

        if (res === null) {

            setModalVisible(false)
        }

    }

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
                            onClick={() => form.submit()}
                            key={"submit"}
                        >
                            {step !== 3 ? "ذخیره و ادامه" : "ثبت"}
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            loading={isMutating}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => {
                                form.resetFields()
                                setStep(1)
                                setModalVisible(false)
                            }}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <div>
                {step === 1 && <Step1 loading={ldCreateLab} handleSubmit={handleCreateLab} form={form}/>}
                {step === 2 &&
                    <Step2 isLoading={ldSaveForm} handleSubmit={handleCreateSaveFormResponsible} form={form}/>}
                {step === 3 && <Step3 isLoading={ldSaveForm} handleSubmit={handleSubmitFormManager} form={form}/>}
            </div>
        </Modal>
    );
}