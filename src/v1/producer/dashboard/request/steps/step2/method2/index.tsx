import React, { useContext } from "react";
import { Button, Col, Divider, Form, Row, Typography } from "antd";
import FormulationFrom from "@/app/producer/dashboard/request/steps/step2/method1/formulation-from";
import { useForm } from "antd/es/form/Form";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import MaterialRequestDetailTable from "@/app/producer/dashboard/request/steps/step2/method2/material-request-detail-table";
import useCrudRequestDetailMaterial from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailMaterial";
import { mutate } from "swr";

function Index() {
  const [form] = useForm();

  const processControl = useContext(StepContext);

  const requestDetailMaterial = useCrudRequestDetailMaterial();

  const handleOnFinish = async (value: any) => {
    value.requestMasterUid = processControl.requestMaster.requestMasterUid;

    const res = await requestDetailMaterial.create.trigger(value, true);

    await mutate("/RequestDetail/GetAllMaterial");
  };

  return (
    <>
      <Typography className="text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary">
        * برای وارد کردن درصد مواد اولیه تمامی اعداد را با حجمی یا وزنی وارد
        نمایید.
      </Typography>

      <Divider />
      <Form
        disabled={requestDetailMaterial.create.isLoading}
        form={form}
        name="form_item_path"
        layout="vertical"
        onFinish={handleOnFinish}
      >
        <FormulationFrom form={form} />
        <div className="flex justify-end">
          <Button
            loading={requestDetailMaterial.create.isLoading}
            htmlType="submit"
          >
            ذخیره
          </Button>
        </div>
      </Form>
      <MaterialRequestDetailTable />
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <Button
            disabled={processControl.isMutating}
            onClick={() => processControl.dispatch({ type: "PREVIOUS" })}
            type="dashed"
            className="bg-gray-100 w-full"
          >
            مرحله قبلی
          </Button>
        </Col>
        <Col xs={24} md={8}>
          <Button
            disabled={processControl.isMutating}
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
            loading={processControl.isMutating}
            size="large"
            type="primary"
            onClick={processControl.getStep3}
          >
            ذخیره و ادامه
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Index;
