"use client";

import React, { useState } from "react";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import { Col, Divider, Form, Input, Row } from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import DateOfVisitForm from "@/app/producer/expert-naft/detail/[uid]/components/date-of-visit-form";
import { useForm } from "antd/es/form/Form";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useRouter } from "next/navigation";
import CustomeDatePicker from "../../../../../../components/CustomeDatePicker";

const apiData = apiUrl.WorkFlowRequest.step05;

const Page = (props: { params: { uid: string } }) => {
  const { data, isLoading } = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiData.get.url,
  });

  const [form] = useForm();

  const [choice, setChoice] = useState<string>();

  const router = useRouter();

  const handleOnClick = (choice: string) => {
    setChoice(choice);
    form.submit();
  };

  const { trigger, isMutating } = useSWRMutation(
    apiData.create.url,
    mutationFetcher
  );

  const handleOnFinish = async (values: any) => {
    const data = {
      ...values,
      taskId: props.params.uid,
      choiceKey: choice,
    };

    const res = await trigger(data);

    if (res) router.push("/producer/scheduling-visit/list");
  };

  return (
    <div className="box-border w-full p-6">
      <WorkflowDataViewer loading={isLoading} data={data as any} />
      <Form onFinish={handleOnFinish} form={form}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              wrapperCol={{ span: 24 }}
              labelCol={{ span: 24 }}
              rules={[{ required: true }]}
              name="datePersian"
              label="تاریخ بازدید نهایی"
            >
              <CustomeDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              wrapperCol={{ span: 24 }}
              labelCol={{ span: 24 }}
              name="description"
              rules={[{ required: true }]}
              label="توضیحات"
            >
              <Input.TextArea
                style={{ height: 100, resize: "none" }}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* <DateOfVisitForm onFinish={handleOnFinish} form={form} /> */}
      {data && <Divider />}
      <WorkflowRequestBtn
        onClick={handleOnClick}
        choices={data?.choices as any}
        nextStepUrl={apiData.create.url}
        taskId={props.params.uid}
        loading={isMutating}
      />
    </div>
  );
};

export default Page;
