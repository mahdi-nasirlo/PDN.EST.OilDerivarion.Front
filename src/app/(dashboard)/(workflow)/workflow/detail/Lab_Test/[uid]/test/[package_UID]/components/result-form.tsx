import useLabSampleTestItemDetail from "@/hooks/request-package/use-lab-sample-test-item-detail";
import useLabSampleTestItemDetailUpdate from "@/hooks/request-package/use-lab-sample-test-item-detail-update";
import { useValidation } from "@/hooks/use-validation";
import { Button, Col, Form, Input, Row, Select } from "antd/lib";
import { RequestPackageApi } from "constance/request-package";
import React, { useEffect } from "react";
import { z } from "zod";

export default function ResultForm({
  rules,
  form,
  someData,
  someDataTest_Item,
}: any) {
  const testFactorStandards = useLabSampleTestItemDetail({
    sample_Code: someData,
    test_Item_Result_UID: someDataTest_Item,
  });

  const testRsult = useLabSampleTestItemDetailUpdate();

  // const [form, rules] = useValidation(
  //   RequestPackageApi.LabSampleTestItemDetailUpdate.type
  // );

  useEffect(() => {
    if (testRsult.data?.data[0]) {
      form.setFieldsValue(testRsult.data?.data[0]);
      console.log(testRsult.data?.data[0]);
    }
  }, [testRsult.data?.data]);

  const handleSumbitOtp = async (
    values: z.infer<typeof RequestPackageApi.LabSampleTestItemDetailUpdate.type>
  ) => {
    const res = await testRsult.mutateAsync({
      ...values,
      sample_Code: someData,
      test_Item_Result_UID: someDataTest_Item,
    });
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSumbitOtp}>
      <Row gutter={[16, 12]}>
        <Col xs={24} sm={8}>
          <Form.Item name="result_Test" label="نتیجه آزمون">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item label="محدوده" name="result_Range">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item label="حداقل قابل قبول" name="result_Min_Accept">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item label="حداکثر قابل قبول" name="result_Max_Accept">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>

        {/* <Col xs={24} sm={8}>
          <Form.Item
            
            label="استاندارد آزمون"
            name="test_Factor_Standards"
          >
            <Select
              //   fieldNames={
              //     RequestPackageApi.LabSampleTestItemDetailUpdate.fieldName
              //   }
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col> */}

        <Col xs={24} sm={8}>
          <Form.Item label="واحد تجدید پذیر" name="result_Renew_Unit_FK">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item label="تجدید پذیر" name="result_Renewable">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={16}>
          <Form.Item name="result_Desc" label="توضیحات">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 10]} className="flex items-center justify-end">
        <Col xs={24} xxl={2} md={4} sm={6}>
          <Button
            className="w-full"
            size="large"
            type="primary"
            htmlType="submit"
          >
            ثبت
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
