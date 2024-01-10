import React, { useContext, useReducer, useState } from "react";
import {
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import useGetAllMaterial from "../../../../../../../../hooks/material/useGetAllMaterial";
import { useGetAllPersonType } from "../../../../../../../../hooks/baseInfo/usePersonTypeGetAll";
import useGetAllSupplyMethod from "../../../../../../../../hooks/baseInfo/useGetAllSupplyMethod";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import percentReducer from "../../../../../../../../reducers/PercentageAction";
import { filterOption } from "../../../../../../../../lib/filterOption";

const FormulationFrom = (props: { form?: FormInstance }) => {
  const processController = useContext(StepContext);

  const materialsData = useGetAllMaterial();

  const personType = useGetAllPersonType();

  const supplyMethod = useGetAllSupplyMethod();

  const initialState = { percentOne: 0, percentTwo: 100 };

  const [state, dispatch] = useReducer(percentReducer, initialState);

  const [supplyMethodStatus, setSupplyMethod] = useState();

  const [personTypeStatus, setPersonType] = useState(null);

  const [SupplyNational, SetSupplyNational] = useState<any>(null);

  const handleFactoryProvinceChange = (value: any, e: any) => {
    setPersonType(e);
    SetSupplyNational(value);
    props.form?.setFieldValue("materialSupplyNationalCode", null);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="materialUid"
            label="نام مواد اولیه"
            rules={[
              { required: true, message: "لطفا مقدار را انتخاب کنید" },
              { type: "string" },
            ]}
          >
            <Select
              showSearch
              //@ts-ignore
              filterOption={filterOption}
              loading={materialsData.isLoadingMaterial}
              options={materialsData.materials}
              fieldNames={{ value: "uid", label: "name" }}
              size="large"
              placeholder="انتخاب نمایید"
              tokenSeparators={[","]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={"materialUnitConsumption"}
            label="میزان مصرف کل برای یک واحد تولیدی(کیلوگرم)"
            rules={[
              {
                required: true,
                message: "لطفا مقدار را وارد کنید",
              },
            ]}
          >
            <Input type="number" size="large" placeholder="وارد نمایید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {[3, 4].includes(
          processController.requestMaster.productionMethodId
        ) && (
          <Col xs={24} md={12}>
            <Form.Item
              name={"materialUsagePercentage"}
              label={"درصد استفاده"}
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
        )}
        {[2].includes(processController.requestMaster.productionMethodId) && (
          <Col xs={24} md={12}>
            <Form.Item
              name={"materialUsagePercentage"}
              label={"درصد استفاده"}
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                {
                  type: "number",
                  min: 1,
                  max: 99,
                  message: "لطفاً مقداری بین 1 تا 99 وارد کنید",
                },
              ]}
            >
              <InputNumber
                controls={false}
                className="w-full rounded-lg"
                size="large"
                min={0}
                max={99}
                formatter={(value) => `${value}%`}
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        )}

        <Col xs={24} md={12}>
          <Form.Item
            initialValue={"داخلی"}
            name="materialSupplyMethodId"
            label="نحوه تامین"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              fieldNames={supplyMethod.fieldNames}
              size="large"
              placeholder="انتخاب نمایید"
              tokenSeparators={[","]}
              value={supplyMethodStatus}
              onChange={(e) => setSupplyMethod(e)}
              loading={supplyMethod.isLoadingSupplyMethod}
              options={supplyMethod.supplyMethods}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />

      {supplyMethodStatus === 2 ? (
        <>
          <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
            مشخصات تامین کننده مواد اولیه
          </Typography>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="materialSupplyName"
                label="نام تامین کننده خارجی"
                rules={[
                  {
                    required: true,
                    message: "لطفا مقدار را وارد کنید",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="materialImportDeclarationNumber"
                label="شماره اظهارنامه واردات"
                rules={[
                  {
                    required: true,
                    message: "لطفا مقدار را وارد کنید",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
            مشخصات تامین کننده مواد اولیه
          </Typography>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="materialSupplyName"
                label="نام"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  { type: "string" },
                ]}
              >
                <Input size="large" placeholder="وارد نمایید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="materialSupplyPersonTypeId"
                label="شخصیت"
                rules={[
                  { required: true, message: "لطفا مقدار را انتخاب کنید" },
                  { type: "number" },
                ]}
              >
                <Select
                  fieldNames={personType.fieldNames}
                  size="large"
                  placeholder="انتخاب نمایید"
                  tokenSeparators={[","]}
                  value={personTypeStatus}
                  onChange={(e, value) => {
                    handleFactoryProvinceChange(value, e);
                  }}
                  loading={personType.isLoadingPersonType}
                  options={personType.personType}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="materialSupplyNationalCode"
                label={
                  personTypeStatus === null
                    ? "شماره ملی / شناسه ملی"
                    : personTypeStatus === 2
                    ? "شناسه ملی"
                    : "شماره ملی"
                }
                rules={[
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.reject(
                          new Error("لطفا مقدار را وارد کنید")
                        );
                      }
                      if (isNaN(value)) {
                        return Promise.reject(new Error("لطفا عدد وارد کنید"));
                      }
                      if (personTypeStatus === 1) {
                        const nationalIdRegex = /^(?!(\d)\1{9})\d{10}$/;
                        if (!nationalIdRegex.test(value)) {
                          return Promise.reject(
                            new Error("شناسه ملی نامعتبر است")
                          );
                        }
                      }
                      if (personTypeStatus === 1 && value.length !== 10) {
                        return Promise.reject(
                          new Error("شماره ملی باید 10 رقم باشد")
                        );
                      }
                      if (personTypeStatus === 2 && value.length !== 11) {
                        return Promise.reject(
                          new Error("شناسه ملی باید 11 رقم باشد")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  value={SupplyNational}
                  size="large"
                  placeholder="وارد نمایید"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="materialSupplyIranCode"
                label="ایرانکد"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  {
                    validator: async (rule, value) => {
                      if (!/^\d+$/.test(value)) {
                      }
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  className="w-full rounded-lg"
                  size="large"
                  placeholder="وارد نمایید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="materialSupplyAddress"
                label="آدرس"
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  { type: "string" },
                ]}
              >
                <Input size="large" placeholder="وارد نمایید" />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default FormulationFrom;
