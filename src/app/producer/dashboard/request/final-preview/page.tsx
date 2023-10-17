"use client";


import React, {useState} from "react";
import {Button, Checkbox, Divider, Form} from "antd";
import ReviewDataModalAcceptAgreement from "../steps/step4/review-data-modal-accept-agreement";
import ReviewDataModalFinalSubmit from "../steps/step4/review-data-modal-final-submit";
import useSWRMutation from "swr/mutation";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {getCookie} from "cookies-next";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import ReviewDataTable from "@/app/producer/dashboard/request/final-preview/components/review-data-table";

export default function Page() {

    const [form] = Form.useForm();

    const router = useRouter()

    const [modalVisibleConfirmation, setModalVisibleConfirmation] = useState(false);
    const [modalVisibleFinalSubmit, setModalVisibleFinalSubmit] = useState(false);

    const showModalConfirmation = () => {
        setModalVisibleConfirmation(true);
    };

    const showModalFinalSubmit = () => {
        setModalVisibleFinalSubmit(true);
    };

    const onFinish = async (values: any) => {
        const data = await trigger({
            "uid": getCookie("requestMasterUid")
        })

        if (data !== undefined) {
            showModalFinalSubmit()
        }
    };

    const { trigger, isMutating } = useSWRMutation("/RequestMaster/UpdateCompleted", mutationFetcher)


    return (
        <>
            <ReviewDataTable />
            <Divider />
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
            >
                <Form.Item
                    className=" mr-3 my-6  font-medium"
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('پذیرش شرایط و قوانین برای ثبت درخواست ضروری می باشد')),
                        },
                    ]}
                >
                    <Checkbox>
                        شرایط و <span className="text-primary-500 p-0" onClick={showModalConfirmation}>قوانین</span> را
                        خوانده و می پذیرم!
                    </Checkbox>
                </Form.Item>
                <Divider />
                <div className="flex gap-6">
                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        <span className="flex gap-3 justify-center ">ثبت و تایید نهایی</span>
                    </Button>
                    <Button
                        disabled
                        className="w-full bg-gray-50 flex items-center justify-center"
                        size="large"
                        icon={<PlusIcon width={24} height={24} />}
                    // onClick={
                    //     () => router.push("/dashboard/request/formulacion")
                    // }
                    >
                        <Link className="w-full" href={"/dashboard/request/formulacion"} >
                            افزودن مواد اولیه و محصول جدید                        </Link>
                    </Button>
                </div>
            </Form>
            <ReviewDataModalAcceptAgreement
                modalVisibleConfirmation={modalVisibleConfirmation}
                setModalVisibleConfirmation={setModalVisibleConfirmation}
            />
            <ReviewDataModalFinalSubmit
                modalVisibleFinalSubmit={modalVisibleFinalSubmit}
                setModalVisibleFinalSubmit={setModalVisibleFinalSubmit}
            />
        </>
    );
}
