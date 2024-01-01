import React, { useContext } from "react";
import { Alert, Button, Col, Divider, Form, Row, Typography } from "antd";
import SelectProductForm from "./select-product-form";
import StepContext from "../../../state-managment/step-context";
import ProductRequestTable from "./product-request-table";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import { mutate } from "swr";
import { useForm } from "antd/es/form/Form";

const Index = () => {
  const [form] = useForm();

  const processController = useContext(StepContext);

  const requestDetailProduct = useCrudRequestDetailProduct();

  const handleOnFinish = async (value: any) => {
    value.requestMasterUid = processController.requestMaster.requestMasterUid;

    await requestDetailProduct.create.trigger(value, false);

    await mutate("/RequestDetail/GetAllProduct");
  };

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
        disabled={
          requestDetailProduct.create.isLoading || processController.isMutating
        }
        onFinish={handleOnFinish}
      >
        <SelectProductForm form={form} />
        <div className="flex justify-end">
          <Button
            type="primary"
            loading={requestDetailProduct.create.isLoading}
            htmlType="submit"
          >
            ذخیره
          </Button>
        </div>
        <Divider />

        <ProductRequestTable />

        <Divider />

        <Row gutter={[12, 12]}>
          <Col xs={24} md={8}>
            <Button
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
              loading={
                requestDetailProduct.create.isLoading ||
                processController.isMutating
              }
              className="w-full"
              size="large"
              type="primary"
              onClick={() => processController.getStep4()}
            >
              ذخیره و ادامه
            </Button>
          </Col>
        </Row >
      </Form>

    </>
  );
};

export default Index;
