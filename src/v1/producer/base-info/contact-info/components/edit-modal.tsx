import { Button, Col, Form, Input, Modal, Row, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import PhoneInputs from "../../../../../../components/inputs/Phone";
import { filterOption } from "../../../../../../lib/filterOption";
import { sortByIndex } from "../../../../../../lib/sortByIndex";
import { url } from "inspector";

export default function EditModal({
  isEditModalVisible,
  setIsEditModalVisible,
  data,
  mutate,
}: {
  isEditModalVisible: any;
  setIsEditModalVisible: any;
  data: any;
  mutate: any;
}) {
  const [form] = useForm();

  useEffect(() => {

    form.setFieldsValue(data);

    SetProvinceCity1(data?.factoryStateId || 1)
    form.setFieldValue("factoryCityId", data?.factoryCityId)

    SetProvinceCity(data?.centralOfficeStateId || 1)
    form.setFieldValue("centralOfficeCityId", data?.centralOfficeCityId)

  }, [data]);

  const { trigger, isMutating } = useSWRMutation(
    "/ProfilePersonContact/Set",
    mutationFetcher
  );

  const onFinish = async (values: any) => {
    const res = await trigger(values);
    await mutate();
    if (res) {
      setIsEditModalVisible(false);
    }
  };

  const { data: StateGetAll, isLoading: ldStateGetAll } = useSWR(
    ["/BaseInfo/StateGetAll"],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );


  const handleFactoryProvinceChange = (value: any) => {
    SetProvinceCity1(value);
    form.setFieldValue("factoryCityId", null);
  };

  const handleCentralOfficeProvinceChange = (value: any) => {
    SetProvinceCity(value);
    form.setFieldValue("centralOfficeCityId", null);
  };

  const [ProvinceCity, SetProvinceCity] = useState(1);
  const [ProvinceCity1, SetProvinceCity1] = useState(1);

  const { data: CityGetAll, isLoading: ldCityGetAll } = useSWR(
    ["/BaseInfo/CityGetAll", { stateId: ProvinceCity }],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );
  const { data: City, isLoading: ldCity } = useSWR(
    ["/BaseInfo/CityGetAll", { stateId: ProvinceCity1 }],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );


  return (
    <>
      <Modal
        width={800}
        title="ویرایش اطلاعات تماس"
        visible={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                loading={isMutating}
                size="large"
                className="w-full"
                type="primary"
                onClick={() => form.submit()}
                key={"submit"}
              >
                ثبت
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                disabled={isMutating}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={() => setIsEditModalVisible(false)}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
            اطلاعات کارخانه
          </Typography>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="factoryStateId"
                label="استان"
                rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
              >
                <Select
                  showSearch
                  // @ts-ignore
                  filterOption={filterOption}
                  loading={ldStateGetAll}
                  options={sortByIndex(StateGetAll, "Name")}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                  onChange={handleFactoryProvinceChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="factoryCityId"
                label="شهرستان"
                rules={[
                  { required: true, message: "لطفا مقدار را انتخاب کنید" },
                ]}
              >
                <Select
                  showSearch
                  // @ts-ignore
                  filterOption={filterOption}
                  loading={ldCity}
                  options={sortByIndex(City, "Name")}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <PhoneInputs label="شماره تماس" name="factoryPhone">
                <Input size="large" placeholder="وارد کنید" />
              </PhoneInputs>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="factoryAddressDetail"
                label="جزئیات آدرس"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
            اطلاعات دفتر مرکزی
          </Typography>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="centralOfficeStateId"
                label="استان"
                rules={[
                  { required: true, message: "لطفا مقدار را انتخاب کنید" },
                ]}
              >
                <Select
                  showSearch
                  // @ts-ignore
                  filterOption={filterOption}
                  loading={ldStateGetAll}
                  options={sortByIndex(StateGetAll, "Name")}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                  onChange={handleCentralOfficeProvinceChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="centralOfficeCityId"
                label="شهرستان"
                rules={[
                  { required: true, message: "لطفا مقدار را انتخاب کنید" },
                ]}
              >
                <Select
                  showSearch
                  // @ts-ignore
                  filterOption={filterOption}
                  loading={ldCityGetAll}
                  options={sortByIndex(CityGetAll, "Name")}
                  fieldNames={{ value: "Id", label: "Name" }}
                  size="large"
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <PhoneInputs name="centralOfficePhone" label="شماره تماس">
                <Input size="large" placeholder="وارد کنید" />
              </PhoneInputs>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="centralOfficeAddressDetail"
                label="جزئیات آدرس"
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}