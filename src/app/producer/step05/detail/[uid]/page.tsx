"use client";

import React, { useState } from "react";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import { Col, Divider, Form, Input, Row, Typography } from "antd";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import { useForm } from "antd/es/form/Form";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useRouter } from "next/navigation";
import CustomDatePicker from "../../../../../../components/CustomeDatePicker";
import GodOfDataViewer from "../../../../../../components/GodOfDataViewer";
import CalendarTime from "../../../../../../components/CalendarTime/calendar-time";

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
    if (choice === "Choice2" && !form.getFieldValue("datePersian")) {
      form.setFieldValue("datePersian", " ");
    } else {
      if (form.getFieldValue("datePersian") === " ")
        form.setFieldValue("datePersian", null);
    }

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

    if (res) router.push("/producer/step05/list");
  };

  return (
    <div className="box-border w-full p-6">
      <div className="flex justify-between flex-col">
        <div className="flex items-center gap-3">
          <Typography className="font-bold">داده های تجمیعی درخواست</Typography>
        </div>
        <Divider />
      </div>
      <GodOfDataViewer
        uid={props.params.uid}
        data={data?.tabs}
        loading={isLoading}
      />
      <CalendarTime data={data?.calendar as any} />
      {/*<WorkflowDataViewer loading={isLoading} data={data as any} />*/}
      {data && <Divider /> && (
        <Form onFinish={handleOnFinish} form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "لطفا تاریخ را انتخاب کنید" },
                ]}
                name="datePersian"
                label="تاریخ بازدید نهایی"
              >
                <CustomDatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                name="description"
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
      )}
      {/* <DateOfVisitForm onFinish={handleOnFinish} form={form} /> */}
      {data && <Divider />}
      <WorkflowRequestBtn
        onClick={handleOnClick}
        trigger={() => true}
        choices={data?.choices as any}
        nextStepUrl={""}
        taskId={props.params.uid}
        loading={isMutating}
      />
    </div>
  );
};

export default Page;
