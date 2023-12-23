import React, { useEffect, useState } from "react";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";
import { sortByIndex } from "../../../../../../lib/sortByIndex";

function CategoryForm({
  defaultSelectedDensity,
}: {
  defaultSelectedDensity?: boolean;
}) {
  const { data, isLoading } = useSWR(
    "/BaseInfo/GetAllProductionMethod",
    listFetcher
  );

  const [hasDensity, setHasDensity] = useState(defaultSelectedDensity);

  useEffect(() => {
    setHasDensity(defaultSelectedDensity);
  }, [defaultSelectedDensity]);

  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="نام دسته بندی"
            rules={[
              { required: true, message: "لطفا مقدار را وارد کنید" },
              { type: "string" },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="productionMethodId"
            label="روش تولید"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              loading={isLoading}
              options={sortByIndex(data, "Name")}
              fieldNames={{ label: "Name", value: "Id" }}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="isActive"
            label="فعال/غیر فعال"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            initialValue={true}
          >
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیرفعال", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="hasDensity"
            label="دانسیته"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              options={[
                { label: "دارد", value: true },
                { label: "ندارد", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
              onChange={(value) => setHasDensity(value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="smallCode"
            label="کد"
            rules={[
              { required: true, message: "لطفا مقدار را وارد کنید" },
              {
                validator(_, value) {
                  const numericValue = parseFloat(value);
                  if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
                    return Promise.reject(
                      new Error("لطفاً عدد صحیح وارد کنید")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      {hasDensity && (
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                {
                  validator(_, value) {
                    if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
                      return Promise.reject(
                        new Error("لطفاً عدد صحیح وارد کنید")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              name="densityLowerLimit"
              label="حداقل بازه"
            >
              <InputNumber
                max={50000}
                className="w-full"
                size="large"
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
                      return Promise.reject(
                        new Error("لطفاً عدد صحیح وارد کنید")
                      );
                    }
                    if (parseInt(value) > getFieldValue("densityLowerLimit")) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error(
                          "حداکثر بازه نمی‌تواند از حداقل بازه کمتر باشد"
                        )
                      );
                    }
                  },
                }),
              ]}
              name="densityUpperLimit"
              label="حداکثر بازه"
            >
              <InputNumber
                max={50000}
                className="w-full"
                size="large"
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CategoryForm;
