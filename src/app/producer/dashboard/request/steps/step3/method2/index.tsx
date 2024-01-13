import React, { useContext } from "react";
import { Alert, Button, Col, Divider, Form, Row, Typography } from "antd";
import SelectProductForm from "@/app/producer/dashboard/request/steps/step3/method1/select-product-form";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import { useForm } from "antd/es/form/Form";

const Index = () => {
  const processController = useContext(StepContext);

  const requestDetailProduct = useCrudRequestDetailProduct();

  const handleOnFinish = async (value: any) => {
    value.requestMasterUid = processController.requestMaster.requestMasterUid;

    const res = await requestDetailProduct.create.trigger(value, false);

    if (res) {
      await processController.getStep4();
    }
  };

  const [form] = useForm();
  return (
    <>
      <Alert
        className="border-none w-full text-right text-base font-medium text-blue-500"
        message={
          "ابتدا محصول خود را انتخاب کرده و بعد آن را ذخیره کنید تا بتوانید به مرحله بعد بروید"
        }
        type="info"
      />
      <Divider />
      <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
        محصول تولیدی
      </Typography>

      <Form
        form={form}
        disabled={processController.isMutating}
        onFinish={handleOnFinish}
        layout="vertical"
      >
        <SelectProductForm form={form} />
        <Divider />
        <Row gutter={[12, 12]}>
          <Col xs={24} md={8}>
            <Button
              disabled={processController.isMutating}
              size="large"
              onClick={() => processController.dispatch({ type: "PREVIOUS" })}
              type="dashed"
              className="bg-gray-100 w-full"
            >
              مرحله قبلی
            </Button>
          </Col>
          <Col xs={24} md={8}>
            <Button
              disabled={processController.isMutating}
              size="large"
              onClick={() => processController.getLastStep()}
              type="default"
              className="bg-gray-100 w-full"
            >
              بازبینی نهایی
            </Button>
          </Col>
          <Col xs={24} md={8}>
            <Button
              loading={processController.isMutating}
              className="w-full management-info-form-submit btn-filter"
              size="large"
              type="primary"
              htmlType="submit"
            >
              ذخیره و ادامه
            </Button>
          </Col>
        </Row>
      </Form >
    </>
  );
};

export default Index;
