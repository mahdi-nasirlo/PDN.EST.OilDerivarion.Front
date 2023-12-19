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
              { required: true, message: "نام مواد اولیه اجباری است" },
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
            label="میزان مصرف برای تولید یک واحد"
            rules={[
              {
                required: true,
                message: "میزان مصرف برای تولید یک واحد اجباری است",
              },
              {
                validator: async (rule, value) => {
                  if (!/^\d+$/.test(value)) {
                    throw new Error("لطفا عدد وارد کنید");
                  }
                },
              },
            ]}
          >
            <Input size="large" placeholder="وارد نمایید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {[2, 3, 4].includes(
          processController.requestMaster.productionMethodId
        ) && (
            <Col xs={24} md={12}>
              <Form.Item
                name={"materialUsagePercentage"}
                label={"درصد استفاده"}
                rules={[
                  { required: true, message: " درصد استفاده اجباری است" },
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
          )}
        <Col xs={24} md={12}>
          <Form.Item
            name={"materialTotalConsumption"}
            label={"میزان مصرف کل"}
            rules={[
              { required: true, message: "میزان مصرف کل اجباری است" },
              {
                validator: async (rule, value) => {
                  if (!/^\d+$/.test(value)) {
                    throw new Error("لطفا عدد وارد کنید");
                  }
                  if (value > 100 || value < 0) {
                    throw new Error("لطفا عدد بین 0 تا 100 وارد کنید");
                  }
                },
              },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="materialSupplyMethodId"
            label="نحوه تامین"
            rules={[
              { required: true, message: "نحوه تامین اجباری است" },
              { type: "number" },
            ]}
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
                name="materialImportDeclarationNumber"
                label="شماره اظهارنامه واردات"
                rules={[
                  { required: true, message: "شماره اظهارنامه واردات اجباری است" },
                  {
                    validator: async (rule, value) => {
                      if (!/^\d+$/.test(value)) {
                        throw new Error("لطفا عدد وارد کنید");
                      }
                    },
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
                  { required: true, message: "نام اجباری است" },
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
                  { required: true, message: "شخصیت اجباری است" },
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
                    ? "کد ملی / شناسه ملی"
                    : personTypeStatus === 2
                      ? "شناسه ملی"
                      : "کد ملی"
                }
                rules={[
                  {
                    validator: (_, value) => {
                      if (
                        value &&
                        personTypeStatus === 2 &&
                        value.length === 11
                      ) {
                        return Promise.resolve();
                      }

                      if (
                        value &&
                        personTypeStatus === 1 &&
                        value.length === 10
                      ) {
                        return Promise.resolve();
                      }

                      if (!value) {
                        return Promise.reject(
                          "کد 'ملی / شناسه ملی' اجباری است"
                        );
                      }

                      if (/^[0-9]{10}$/) {
                        return Promise.reject("کد ملی نامتعبر است");
                      }

                      if (value && personTypeStatus === 2) {
                        return Promise.reject("شناسه ملی باید 11 رقم باشد");
                      }
                    },
                  },
                ]}
              >
                <Input
                  value={SupplyNational}
                  size="large"
                  placeholder="وارد نمایید"
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
                  { required: true, message: "ایرانکد اجباری است" },
                  {
                    validator: async (rule, value) => {
                      if (!/^\d+$/.test(value)) {
                        throw new Error("لطفا عدد وارد کنید");
                      }
                    },
                  },
                ]}
              >
                <Input
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
                  { required: true, message: "آدرس اجباری است" },
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
