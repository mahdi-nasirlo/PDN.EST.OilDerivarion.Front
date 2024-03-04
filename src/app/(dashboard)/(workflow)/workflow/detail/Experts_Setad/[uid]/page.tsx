"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button, Card, Col, Divider, Row, Spin, Typography } from "antd/lib";
import RepostsMaker from "@/components/reposts-maker";
import { useRouter } from "next/navigation";
import useFinalResultList from "@/hooks/request-package/use-final-result-list";
import EstOpinionForm from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/components/est_opinion_form";
import Naft_opinion_form from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/components/naft_opinion_form";
import Samt_opinion_form from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/components/samt_opinion_form";
import { Tag } from "antd";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import useUiOpinionFormWorkFlow from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/hook/use-ui-opinion-form-work-flow";
import { useCheckReportSeen } from "@/providers/workflow-provider";
import LabResult from "../../components/lab-report";
import WorkFlowSteps from "@/components/workflow/work-flow-steps";

const stepKey = "Experts_Setad";

const Page = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();

  const requestList = useFinalResultList({ package_UID: params.uid });

  const { get, handleSet, reports, form, dataForm, setChoice, set } =
    useUiOpinionFormWorkFlow({ taskId: params.uid });

  const { isSeenReport } = useCheckReportSeen(
    stepKey + "_" + params.uid,
    reports.data
  );

  console.log(dataForm.data);

  if (!get.data && get.isFetching) {
    return (
      <Card className="min-h-[150px] flex justify-center items-center">
        <Spin />
      </Card>
    );
  }

  return (
    <div>
      {get.data?.task && (
        <Breadcrumb
          pages={[{ label: "خانه" }]}
          currentPage={"بررسی نتایج آزمایشگاه توسط کارگروه مرکزی ستاد"}
          titleIcon={<DocumentTextIcon className="w-8" />}
          actions={[
            <Button key={1} size="large" onClick={() => router.back()}>
              بازگشت
            </Button>,
          ]}
        />
      )}
      <WorkFlowSteps tasId={params.uid} />
      <Card>
        <div>
          <Divider orientation="left" className="mb-6">
            لیست گزارشات
          </Divider>
          <Spin spinning={get.isFetching}>
            <RepostsMaker
              stepKey={stepKey}
              taskId={params.uid}
              reports={reports.data}
              loading={reports.isFetching}
            />
          </Spin>
        </div>

        <div className="mt-8">
          <Divider orientation="left" className="mb-6">
            نتایج آزمون
          </Divider>
          <Spin spinning={get.isFetching}>
            <LabResult package_UID={params.uid} />
          </Spin>
        </div>
      </Card>

      <div className="flex justify-start items-center my-5 mt-14">
        <div className="ml-4 flex items-center justify-center bg-CustomizeBlue-500 rounded-full w-11 h-11">
          <DocumentTextIcon className="h-8" />
        </div>
        <Typography className="font-normal text-3xl">لیست نتایج</Typography>
      </div>

      <Row gutter={[16, 35]} className="mb-7">
        {requestList.data?.requestPackageFinalResultList.map(
          (request, index) => (
            <Col key={index} sm={24} md={12} lg={8}>
              <Card>
                <div className="flex items-center justify-between">
                  <Typography className="ml-2 flex text-gray-400">
                    محصول:
                  </Typography>
                  <Tag
                    color="blue"
                    className="p-2 rounded-xl whitespace-pre-wrap"
                  >
                    {request.product_name}
                  </Tag>
                </div>
                <Divider orientation="left">نظر نهایی سیستمی</Divider>
                <div className="flex items-center justify-between mt-6">
                  <Typography className="ml-2 flex text-gray-400">
                    وضعیت سیستم: {request.system_Opinion_ID} as
                  </Typography>
                  <Tag
                    color={
                      [
                        "blue-inverse",
                        "red-inverse",
                        "green-inverse",
                        "orange-inverse",
                      ][request.system_Opinion_ID]
                    }
                    className="p-2 mx-0 rounded-xl"
                  >
                    {["نامعتبر", "رد می شود", "تایید می شود", "آزمون تکمیلی"][
                      request.system_Opinion_ID
                    ] || "در حال رأی گیری"}
                  </Tag>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <Typography className="ml-2 flex text-gray-400">
                    آزمون های تکمیلی:
                  </Typography>
                  <Typography>
                    {request.system_test_item
                      ? request.system_test_item
                      : "ندارد"}
                  </Typography>
                </div>
                <Naft_opinion_form
                  uid={params.uid}
                  request={request}
                  visit_Type={requestList.data?.visit_Type}
                />
                <Samt_opinion_form
                  uid={params.uid}
                  request={request}
                  visit_Type={requestList.data?.visit_Type}
                />
                <EstOpinionForm
                  uid={params.uid}
                  request={request}
                  visit_Type={requestList.data?.visit_Type}
                />
                {/*&& !dataForm.data.ReadOnly*/}
              </Card>
            </Col>
          )
        )}
        <Col sm={24}>
          {dataForm.data?.visit_Type == 3 &&
            dataForm.data.requestPackageFinalResultList?.filter((item) =>
              Number.isInteger(item.system_Opinion_ID)
            ).length > 0 && (
              <>
                <Divider />
                <WorkflowBtn
                  loading={set.isPending}
                  disable={!isSeenReport}
                  choices={get.data?.choices}
                  onClick={async (choice_Key) => {
                    setChoice(choice_Key);
                    form.submit();
                    const res = await set.mutateAsync({
                      taskId: params.uid,
                      stepKey,
                      choiceKey: choice_Key,
                    });

                    if (res.success) router.push("/workflow/list/" + stepKey);
                  }}
                />
              </>
            )}
        </Col>
      </Row>
    </div>
  );
};

export default Page;
