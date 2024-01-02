"use client";

import { Col, Divider, Form, Input, Row, Spin, Typography } from "antd";
import { Choice } from "../../../../../../interfaces/requestDetail";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import { useForm } from "antd/es/form/Form";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import useRequestDetailCreateDabirExpertOpinion from "../../../../../../hooks/requestDetail/useRequestDetailCreateDabirExpertOpinion";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";

interface PropType {
  params: { uid: string };
}

interface DataFetchType {
  choices: Choice[];
  task: {
    processId: string;
    stepId: string;
    reference_ID: string;
    group_ID: string;
    step_Name: string;
    counting_position: string;
    userId: number;
  };
}

const apiData = apiUrl.WorkFlowRequest.cartable;

export default function Home(props: PropType) {
  const [commentForm] = useForm();

  const [form] = useForm();

  const [choice, setChoice] = useState<string>();

  const router = useRouter();

  const { isLoading, data, mutate } = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiData.get.url,
  });

  const { isMutating, trigger } = useSWRMutation(
    apiData.create.url,
    mutationFetcher
  );

  const onFinish = async (values: any) => {
    const data = {
      ...values,
      taskId: props.params.uid,
      choiceKey: choice,
    };

    const res = await trigger(data);

    if (res) router.push("/producer/workflow-cartable/list");
  };

  const confirmRequest = useRequestDetailCreateDabirExpertOpinion();

  const dataConfirmRequest = useSWR(
    "/RequestDetail/GetAllProductAndDabirExpertOpinion",
    (url) => listFetcher(url, { arg: { uid: props.params.uid } })
  );

  useEffect(() => {
    form.setFieldsValue(data?.producer);
  }, [data?.producer]);

  return (
    <>
      <div className="box-border w-full p-6">
        <div className="flex justify-between flex-col">
          <div className="flex items-center gap-3">
            <Typography className="font-bold">
              داده های تجمیعی درخواست
            </Typography>
          </div>
          <Divider />
        </div>
        {/* <GodOfDataViewer
          uid={props.params.uid}
          data={data?.tabs}
          loading={isLoading}
        /> */}

        <Spin spinning={isLoading}>
          <Form layout="vertical" form={form} disabled={isMutating}>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  label="نام"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  label="نام خانوادگی"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="personNationalCode"
                  label="کدملی"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: " کدملی نامتعبر است",
                    },
                  ]}
                >
                  <Input
                    disabled
                    type="number"
                    size="large"
                    placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="companyName"
                  label="نام شرکت"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="companyNationalCode"
                  label="شناسه ملی شرکت"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="stateName"
                  label="استان"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="businessNumber"
                  label="شناسه کسب و کار"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="licenseTypeName"
                  label="نوع مجوز"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="licenseNumber"
                  label="شماره مجوز"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="licenseValidityDatePersin"
                  label="تاریخ اعتبار مجوز"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="licenseIssuerTypeName"
                  label="صادر کننده مجوز"
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24}>
                <Form.Item
                  rules={[
                    { required: true, message: "لطفا مقدار را وارد کنید" },
                  ]}
                  name="requestDescription"
                  label="شرح درخواست"
                >
                  <Input.TextArea
                    disabled
                    style={{ height: 120, resize: "none" }}
                    placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
        {data && (
          <>
            <Divider />
            {/* <WorkFlowConfirmProductTable
              isLoading={dataConfirmRequest.isLoading}
              dataSource={dataConfirmRequest.data}
              uid={props.params.uid}
              trigger={confirmRequest.handleTrigger}
            /> */}
            {/*<WorkflowDataViewer loading={isLoading} data={data as any}/>*/}
            <Form onFinish={onFinish} form={commentForm}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                  <Form.Item
                    rules={[
                      { required: true, message: "لطفا مقدار را انتخاب کنید" },
                    ]}
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
          </>
        )}
        {/* <Typography>{JSON.stringify(apiData.create.url)}</Typography> */}

        {/* <DateOfVisitForm form={form} onFinish={onFinish} /> */}
        {data && <Divider />}
        <WorkflowRequestBtn
          loading={isMutating}
          choices={data?.choices as any}
          onClick={(choiceKey) => {
            setChoice(choiceKey);
            commentForm.submit();
          }}
          trigger={() => true}
          nextStepUrl={apiData.create.url}
          taskId={props.params.uid}
        />
      </div>
    </>
  );
}
