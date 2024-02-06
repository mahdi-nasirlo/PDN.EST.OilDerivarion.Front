"use client";

import React, {useState} from "react";
import Breadcrumb from "@/components/breadcrumb";
import {DocumentMagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Button, Checkbox, Col, Divider, Form, Row} from "antd";
import {Card} from "@/components/card";
import {useRouter} from "next/navigation";
import {useForm} from "antd/lib/form/Form";
import {materialApi} from "../../../../constance/material";
import {useRequestPackageFinalization} from "@/hooks/request-package/use-request-package-finalization";
import ReviewDataModalAcceptAgreement from "@/app/(dashboard)/request/final-review/review-data-modal-accept-agreement";
import ReviewDataModalFinalSubmit from "@/app/(dashboard)/request/final-review/review-data-modal-final-submit";
import {useRequestPackageReportList} from "@/hooks/request-package/use-request-package-report-list";
import RepostsMaker from "@/components/reposts-maker";

export default function Page() {

    const router = useRouter();

    const [form] = useForm()

    const reposts = useRequestPackageReportList({step_Key: materialApi.GetRegisteredReportsForStepByKey.finalKey})

    const finalRequest = useRequestPackageFinalization()

    const [modalVisibleConfirmation, setModalVisibleConfirmation] = useState(false);

    const [modalVisibleFinalSubmit, setModalVisibleFinalSubmit] = useState(false);

    return (
        <div>
            <Breadcrumb
                pages={[
                    {label: "خانه", path: "/"},
                    {label: "ثبت درخواست", path: "/request"},
                ]}
                currentPage="بازبینی نهایی درخواست"
                titleIcon={<DocumentMagnifyingGlassIcon className="w-8"/>}
            />
            <Card>
                {/*// @ts-ignore*/}
                <RepostsMaker taskId={null} reports={reposts.data} loading={reposts.isFetching}/>
                <Divider/>
                <Form form={form} onFinish={async (values) => {

                    const res = await finalRequest.mutateAsync()

                    if (res.success)
                        setModalVisibleFinalSubmit(true)

                }}>
                    <Form.Item
                        className="flex mr-3 my-6 font-medium"
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                            new Error(
                                                "پذیرش شرایط و قوانین برای ثبت درخواست ضروری می باشد"
                                            )
                                        ),
                            },
                        ]}
                    >
                        <Checkbox>
                            شرایط و
                            <span
                                className="text-primary-500 p-0"
                                onClick={() => setModalVisibleConfirmation(true)}
                            >
                                {" قوانین "}
                            </span>
                            را خوانده و و اطلاعات فوق را تایید می کنم!
                        </Checkbox>
                    </Form.Item>
                    <Divider/>
                    <Row gutter={[12, 12]}>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                onClick={() => router.push("/request")}
                                type="default"
                                className="bg-gray-100 w-full"
                            >
                                بازگشت
                            </Button>
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                loading={finalRequest.isPending}
                                className="w-full "
                                type="primary"
                                htmlType="submit"
                            >
                                ثبت نهایی
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <ReviewDataModalAcceptAgreement
                modalVisibleConfirmation={modalVisibleConfirmation}
                setModalVisibleConfirmation={setModalVisibleConfirmation}
            />
            <ReviewDataModalFinalSubmit
                modalVisibleFinalSubmit={modalVisibleFinalSubmit}
                setModalVisibleFinalSubmit={() => router.push("/request/list")}
            />
        </div>
  );
}
