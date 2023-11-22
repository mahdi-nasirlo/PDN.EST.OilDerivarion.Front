import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";

function CategoryForm({
  defaultSelectedDensity,
}: {
  defaultSelectedDensity?: boolean;
}) {
  const { data, isLoading } = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);

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
              { required: true },
              { type: "string" },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="testMethodId"
            label="روش تولید"
            rules={[
              { required: true },
            ]}
          >
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              loading={isLoading}
              options={data}
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
            rules={[{ required: true }]}
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
            rules={[{ required: true }]}
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
      {hasDensity && (
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[
                { required: true },
                {
                  validator(_, value) {
                    if (isNaN(value)) {
                      return Promise.reject(new Error("لطفاً عدد وارد کنید"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              name="densityLowerLimit"
              label="حداقل بازه"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (isNaN(value)) {
                      return Promise.reject(new Error("لطفاً عدد وارد کنید"));
                    }
                    if (value > getFieldValue("densityLowerLimit")) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("حداکثر بازه نمی‌تواند از حداقل بازه کمتر باشد"));
                    }
                  },
                })
              ]}
              name="densityUpperLimit"
              label="حداکثر بازه"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CategoryForm;
