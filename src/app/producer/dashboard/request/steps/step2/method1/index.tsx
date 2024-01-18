import React, { useContext } from "react";
import { Button, Col, Divider, Form, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormulationFrom from "@/app/producer/dashboard/request/steps/step2/method1/formulation-from";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useCrudRequestDetailMaterial from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailMaterial";

function Index() {
  const [form] = useForm();

  const processControl = useContext(StepContext);

  const crudMaterialRequestDetail = useCrudRequestDetailMaterial();

  const handleSubmit = async (value: any) => {
    value.requestMasterUid = processControl.requestMaster.requestMasterUid;

    const res = await crudMaterialRequestDetail.create.trigger(value, true);

    if (res) await processControl.getStep3();
  };

  return (
    <>
      <Typography className="text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary">
        * برای وارد کردن درصد مواد اولیه تمامی اعداد را به صورت درصد وزنی وارد
        نمایید.
      </Typography>

      <Divider />
      <Form
        form={form}
        disabled={
          crudMaterialRequestDetail.create.isLoading ||
          processControl.isMutating
        }
        name="form_item_path"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <FormulationFrom form={form} />
        <Divider />
        <Row gutter={[12, 12]}>
          <Col xs={24} md={8}>
            <Button
              onClick={() => processControl.dispatch({ type: "PREVIOUS" })}
              size="large"
              type="dashed"
              className="bg-gray-100 w-full"
            >
              مرحله قبلی
            </Button>
          </Col>
          <Col xs={24} md={8}>
            <Button
              size="large"
              onClick={() => processControl.getLastStep()}
              type="default"
              className="bg-gray-100 w-full"
            >
              بازبینی نهایی
            </Button>
          </Col>
          <Col xs={24} md={8}>
            <Button
              className="w-full"
              loading={
                crudMaterialRequestDetail.create.isLoading ||
                processControl.isMutating
              }
              size="large"
              type="primary"
              htmlType="submit"
            >
              ذخیره و ادامه
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Index;
