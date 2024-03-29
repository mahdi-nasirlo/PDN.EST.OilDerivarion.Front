import useLabSampleTestItemDetail from "@/hooks/request-package/use-lab-sample-test-item-detail";
import useLabSampleTestItemDetailUpdate from "@/hooks/request-package/use-lab-sample-test-item-detail-update";
import { useValidation } from "@/hooks/use-validation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Alert, Divider, InputNumber, Select, Spin, Typography } from "antd";
import { Button, Col, Form, Input, Row } from "antd/lib";
import { RequestPackageApi } from "constance/request-package";
import React, { useEffect } from "react";
import { z } from "zod";

const LabSampleTestItemDetailUpdateApi = RequestPackageApi.LabSampleTestItemDetailUpdate;

export default function ResultForm({ formData, setFormData, package_UID }: any) {

  const testFactorStandards = useLabSampleTestItemDetail({
    package_UID: package_UID,
    sample_Code: formData.Sample_Code,
    test_Item_Result_UID: formData.test_Item_Result_UID,
  });

  const testResultUpdate = useLabSampleTestItemDetailUpdate();

  const [form, rules] = useValidation(LabSampleTestItemDetailUpdateApi.type);

  const handleSubmitTestResult = async (values: z.infer<typeof LabSampleTestItemDetailUpdateApi.type>) => {

    const res = await testResultUpdate.mutateAsync({
      ...values,
      package_UID: package_UID,
      sample_Code: formData.Sample_Code,
      test_Item_Result_UID: formData.test_Item_Result_UID,
    });
    if (res.success) {
      setFormData({
        Factor_Name: undefined,
        Sample_Code: undefined,
        test_Item_Result_UID: undefined,
        Lab_Is_Finished: undefined
      })
    }
  };

  useEffect(() => {
    if (testFactorStandards.data && testFactorStandards.data[0]) {
      form.setFieldsValue(testFactorStandards.data[0]);
    }
  }, [testFactorStandards.data || formData]);

  return (
    <>
      {(formData.Sample_Code && formData.test_Item_Result_UID) ?
        <Spin spinning={testFactorStandards.isFetching && testFactorStandards.isLoading}>
          <div className="flex justify-between items-center">
            <Typography className="text-right font-bold text-CustomizeBlue-500">
              {`ثبت نتیجه فاکتور آزمون ${formData?.Factor_Name}`}
            </Typography>
            <Button
              type="link"
              className="text-CustomizeBlue-500"
              onClick={() => setFormData({
                Factor_Name: undefined,
                Sample_Code: undefined,
                test_Item_Result_UID: undefined,
                Lab_Is_Finished: undefined
              })}
            >
              <XMarkIcon width={24} height={24} />
            </Button>
          </div>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            disabled={formData.Lab_Is_Finished}
            onFinish={handleSubmitTestResult}
          >
            <Row gutter={[16, 12]}>
              <Col xs={24} sm={8}>
                <Form.Item rules={[rules]} name="result_Test" label="نتیجه آزمون">
                  <Input size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item rules={[rules]} label="محدوده" name="result_Range">
                  <InputNumber maxLength={15} controls={false} className="w-full" size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item rules={[rules]} label="حداقل قابل قبول" name="result_Min_Accept">
                  <InputNumber maxLength={15} controls={false} className="w-full" size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item rules={[rules]} label="حداکثر قابل قبول" name="result_Max_Accept">
                  <InputNumber maxLength={15} controls={false} className="w-full" size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item
                  label="استاندارد آزمون"
                  name="test_Factor_Standards"
                  rules={[rules]}
                >
                  <Select
                    options={
                      (testFactorStandards.data && testFactorStandards.data[0])
                        ? testFactorStandards.data[0]?.method?.map(method => (
                          { label: method.title, value: method.uid }
                        ))
                        : []
                    }
                    size="large"
                    placeholder="انتخاب کنید"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item rules={[rules]} label="واحد تجدید پذیر" name="result_Renew_Unit_FK">
                  <InputNumber maxLength={15} controls={false} className="w-full" size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={8}>
                <Form.Item rules={[rules]} label="تجدید پذیر" name="result_Renewable">
                  <InputNumber maxLength={15} controls={false} className="w-full" size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={16}>
                <Form.Item rules={[rules]} name="result_Desc" label="توضیحات">
                  <Input.TextArea style={{ resize: "none" }} />
                </Form.Item>
              </Col>
            </Row>
            {!formData.Lab_Is_Finished &&
              <Row gutter={[16, 10]} className="flex items-center justify-end">
                <Col xs={24} xxl={2} md={4} sm={6}>
                  <Button
                    loading={testResultUpdate.isPending}
                    className="w-full"
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    ثبت
                  </Button>
                </Col>
              </Row>
            }
          </Form>
        </Spin>
        :
        <Alert
          type="info"
          className="w-full my-3 text-blue-800 text-right"
          message="برای ثبت نتیجه آزمون هر فاکتور یا تغییر آن ، قبل از ثبت نهایی ، از گزینه  ثبت نتیجه آزمون و یا مشاهده در بخش عملیات استفاده نمایید."
        />
      }
    </>
  );
}
