"use client";

import { Col, Divider, Form, Input, Row, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import useLicenseGetRequest from "./hook/use-licese-get-request";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateNationalCode } from "@/lib/validate-national-code";
import Breadcrumb from "@/components/breadcrumb"
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/card";
interface PropType {
  params: { uid: string };
}

export default function Home(props: PropType) {
  const [chiceKey, setChoiceKey] = useState<string>();

  const { data, isFetching, form, setRequest } = useLicenseGetRequest(
    props.params.uid
  );
  const router = useRouter();

  const [workflowForm] = useForm();
  const onFinish = async (values: any) => {
    const res = await setRequest.mutateAsync({
      ...values,
      choice_Key: chiceKey as string,
      request_Uid: props.params.uid,
      description: values.description,
    });
    if (res) {
      router.push("/license_get_requset_list");
    }
  };

  if (!data && isFetching)
    return (
      <Card className="min-h-[150px]">
        <Spin />
      </Card>
    );


  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentTextIcon className="w-8" />}
        currentPage={"داده های تجمیعی درخواست"}
        backLink="/license_get_requset_list"
        pages={[
          { label: "خانه", path: "/" },
          { label: "لیست درخواست مجوز ها", path: "/license_get_requset_list" }
        ]}
      />
      <Card>
        <Spin spinning={setRequest.isPending || isFetching}>
          <Form layout="vertical" form={form} disabled={setRequest.isPending}>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="Representative__Name" label="نام">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="Representative__Family" label="نام خانوادگی">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  required={false}
                  name="Representative__National_Code"
                  label="شماره ملی"
                  rules={[
                    { required: true, message: 'لطفا مقدار را وارد کنید' },
                    {
                      validator(rule, value, callback) {
                        if (value && !validateNationalCode(value)) {
                          callback('کد ملی وارد شده معتبر نیست');
                        } else {
                          callback();
                        }
                      }
                    }
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
              <Col xs={24} sm={12}>
                <Form.Item name="Company__Name" label="نام شرکت">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="Company__National_ID" label="شناسه ملی شرکت">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="Company__Business_ID" label="شناسه کسب و کار">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="License_Type_Name" label="نوع مجوز">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item name="License_Number" label="شماره مجوز">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="License_Expire_Date_Fa"
                  label="تاریخ اعتبار مجوز"
                >
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="State_Name" label="استان">
                  <Input disabled size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
        {data?.choices && (
          <>
            <Divider />
            <Form onFinish={onFinish} form={workflowForm} layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24}>
                  <Form.Item
                    required={false}
                    rules={[
                      { required: true, message: "لطفا مقدار را وارد کنید" },
                    ]}
                    name="description"
                    label="توضیحات"
                  >
                    <Input.TextArea
                      style={{ resize: "none" }}
                      placeholder="وارد کنید"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        )}

        {data && <Divider />}
        <WorkflowBtn
          loading={setRequest.isPending}
          onClick={(key) => {
            setChoiceKey(key);
            workflowForm.submit();
          }}
          choices={data?.choices}
        />
      </Card >
    </>
  );
}
