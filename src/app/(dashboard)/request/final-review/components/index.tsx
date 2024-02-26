import React from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/card";
import RepostsMaker from "@/components/reposts-maker";
import { Button, Checkbox, Col, Divider, Form, Row } from "antd";
import ReviewDataModalAcceptAgreement
    from "@/app/(dashboard)/request/final-review/components/review-data-modal-accept-agreement";
import ReviewDataModalFinalSubmit
    from "@/app/(dashboard)/request/final-review/components/review-data-modal-final-submit";
import { useRouter } from "next/navigation";
import useUiRequestFinalReview from "@/app/(dashboard)/request/final-review/hooks/use-ui-request-final-review";
import WorkflowProvider from "@/providers/workflow-provider";
import Link from 'next/link';

const Index = ({ package_UID }: { package_UID?: string }) => {

    const {
        reposts,
        form,
        finalRequest,
        modalVisibleFinalSubmit,
        onFinish,
        setModalVisibleConfirmation,
        modalVisibleConfirmation
    }
        = useUiRequestFinalReview(package_UID)


    const router = useRouter()

    return (
        <div>
            <Breadcrumb
                pages={[
                    { label: "خانه", path: "/" },
                    { label: "ثبت درخواست", path: `/request/${package_UID ? "/" + package_UID : ""}` },
                ]}
                currentPage="بازبینی نهایی درخواست"
                titleIcon={<DocumentMagnifyingGlassIcon className="w-8" />}
            />
            <Card>
                <WorkflowProvider>
                    <RepostsMaker reports={reposts.data} loading={reposts.isFetching} />
                </WorkflowProvider>
                <Divider />
                <Form
                    form={form}
                    onFinish={onFinish}
                >
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
                            را خوانده و اطلاعات فوق را تایید می کنم!
                        </Checkbox>
                    </Form.Item>
                    <Divider />
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12}>
                            <Link href={`/request/${package_UID ? "/" + package_UID : ""}`}>
                                <Button
                                    loading={finalRequest.isPending}
                                    size="large"
                                    type="default"
                                    className="bg-gray-100 w-full"
                                >
                                    بازگشت
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Button
                                loading={finalRequest.isPending}
                                disabled={finalRequest.isPending}
                                size="large"
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
};

export default Index;