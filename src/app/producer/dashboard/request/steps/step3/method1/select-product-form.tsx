import React, { useContext, useState } from "react";
import { Col, Form, FormInstance, InputNumber, Row, Select } from "antd";
import useGetAllDensityType from "../../../../../../../../hooks/baseInfo/useGetAllDensityType";
import useGetAllProductSelectable from "../../../../../../../../hooks/requestDetail/useGetAllProductSelectable";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import { filterOption } from "../../../../../../../../lib/filterOption";

const SelectProductForm = ({ form }: { form: FormInstance<any> }) => {
  const processController = useContext(StepContext);

  const densityData = useGetAllDensityType();

  const productSelectableData = useGetAllProductSelectable();

  const [density, setDensity] = useState();

  const ChangeDensity = async (value: any) => {
    setDensity(value);

    productSelectableData.getSelectableProduct({
      requestMasterUid: processController.requestMaster.requestMasterUid,
      densityTypeId: value,
    });

    form.setFieldValue("productUid", null);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="densityTypeId"
            label="دانسیته محصول"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              onChange={ChangeDensity}
              options={densityData.density}
              loading={densityData.ldDensity}
              fieldNames={densityData.fieldNames}
              size="large"
              placeholder="انتخاب نمایید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="productUid"
            label="نام محصول"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              loading={productSelectableData.isLDSelectable}
              fieldNames={{ value: "uid", label: "name" }}
              size="large"
              placeholder="انتخاب نمایید"
              disabled={typeof density !== "number"}
              tokenSeparators={[","]}
              options={productSelectableData.selectableProduct}
            />
          </Form.Item>
        </Col>
      </Row>
      {[1, 3, 4].includes(
        processController.requestMaster.productionMethodId
      ) && (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={"productUsageExploitation"}
              label={"درصد استحصال"}
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                {
                  type: "number",
                  min: 1,
                  max: 100,
                  message: "لطفاً مقداری بین 1 تا ۱۰۰ وارد کنید",
                },
              ]}
            >
              <InputNumber
                controls={false}
                className="w-full rounded-lg"
                size="large"
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={"productUsageWasted"}
              label={"درصد هدر رفت"}
              rules={[
                { required: true, message: "لطفا مقدار را انتخاب کنید" },
                {
                  type: "number",
                  min: 0,
                  max: 100,
                  message: "لطفاً مقداری بین 0 تا ۱۰۰ وارد کنید",
                },
              ]}
            >
              <InputNumber
                controls={false}
                className="w-full rounded-lg"
                size="large"
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SelectProductForm;
