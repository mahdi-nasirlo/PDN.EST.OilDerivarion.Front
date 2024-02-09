"use client"

import React from 'react';
import Breadcrumb from "@/components/breadcrumb";
import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {Button, Card, Col, Divider, Row, Spin, Typography} from "antd/lib";
import RepostsMaker from "@/components/reposts-maker";
import {useRouter} from "next/navigation";
import useFinalResultList from "@/hooks/request-package/use-final-result-list";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import {useGetRegisteredReportsForStepByKey} from "@/hooks/material/use-get-registered-reports-for-step-by-key";
import EstOpinionForm
    from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/components/est_opinion_form";
import Naft_opinion_form
    from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/components/naft_opinion_form";
import Samt_opinion_form
    from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/components/samt_opinion_form";
import {Tag} from "antd";

const Page = ({params}: { params: { uid: string } }) => {

    const router = useRouter();

    const get = useGetTask({taskId: params.uid, stepKey: "Experts_Setad"});

    const reposts = useGetRegisteredReportsForStepByKey("Experts_Setad", params.uid);

    const requestList = useFinalResultList({package_UID: params.uid})

    if (!get.data && get.isFetching) {
        return (
            <Card className="min-h-[150px] flex justify-center items-center">
                <Spin/>
            </Card>
        );
    }

    return <div>
        {get.data?.task && (
            <Breadcrumb
                pages={[{label: "خانه"}]}
                currentPage={"بررسی نتایج آزمون کارگروه مرکزی ستاد"}
                titleIcon={<DocumentTextIcon className="w-8"/>}
                actions={[
                    <Button key={1} size="large" onClick={() => router.back()}>
                        بازگشت
                    </Button>,
                ]}
            />
        )}
        <Card>
            <div>
                <Divider orientation="left" className="mb-6">
                    لیست گزارشات
                </Divider>
                <Spin spinning={get.isFetching}>
                    <RepostsMaker
                        taskId={params.uid}
                        reports={reposts.data}
                        loading={reposts.isFetching}
                    />
                </Spin>
            </div>
        </Card>

        <div className="flex justify-start items-center my-5 mt-14">
            <div
                className="ml-4 flex items-center justify-center bg-CustomizeBlue-500 rounded-full w-11 h-11"
            >
                <DocumentTextIcon className="h-8"/>
            </div>
            <Typography className="font-normal text-3xl">
                لیست نتایج
            </Typography>
        </div>

        <Row gutter={[16, 35]} className="mb-7">
            {requestList.data?.map((request, index) => <Col key={index} sm={24} md={12} lg={8}>
                <Card>
                    <div className="flex items-center justify-between">
                        <Typography className="ml-2 flex text-gray-400">
                            محصول:
                        </Typography>
                        <Tag color="blue" className="p-2 rounded-xl">
                            {request.product_name}
                        </Tag>
                    </div>
                    <Divider orientation="left">نظر نهایی سیستمی</Divider>
                    <div className="flex items-center justify-between mt-6">
                        <Typography className="ml-2 flex text-gray-400">
                            وضعیت سیستم:
                        </Typography>
                        <Tag
                            color={["blue-inverse", "green-inverse", "orange-inverse", "red-inverse"][request.System_Opinion_ID]}
                            className="p-2 mx-0 rounded-xl">
                            {[
                                "نامعتبر",
                                "تایید می شود",
                                "آزمون تکمیلی",
                                "رد می شود"
                            ][request.System_Opinion_ID] || "در حال رأی گیری"}
                        </Tag>
                    </div>
                    {/*<Divider orientation="left">آزمون های تکمیلی</Divider>*/}
                    <div className="flex items-center justify-between mt-6">
                        <Typography className="ml-2 flex text-gray-400">
                            آزمون های تکمیلی:
                        </Typography>
                        <Typography>
                            {request.system_test_item ? request.system_test_item : "ندارد"}
                        </Typography>
                    </div>
                    <EstOpinionForm uid={params.uid} request={request}/>
                    <Naft_opinion_form uid={params.uid} request={request}/>
                    <Samt_opinion_form uid={params.uid} request={request}/>
                </Card>
            </Col>)}
        </Row>
    </div>
};

export default Page;