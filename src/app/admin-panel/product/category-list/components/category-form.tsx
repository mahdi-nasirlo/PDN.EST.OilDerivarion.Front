import React, { useEffect, useState } from "react";
import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";

function CategoryForm({
  form,
  defaultSelectedDensity,
}: {
  form: FormInstance;
  defaultSelectedDensity?: boolean;
}) {
  const { data, isLoading } = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);

  const [hasDensity, setHasDensity] = useState(defaultSelectedDensity);

  useEffect(() => {
    setHasDensity(defaultSelectedDensity);
  }, [defaultSelectedDensity]);

  //   const validateDensityLowerLimit = (
  //     rule: Rule,
  //     value: any,
  //     callback: CallableFunction
  //   ) => {
  //     const densityUpperLimit = form.getFieldValue("densityUpperLimit");
  //     if (
  //       densityUpperLimit !== undefined &&
  //       value !== undefined &&
  //       value < densityUpperLimit
  //     ) {
  //       callback("حداکثر بازه نمی‌تواند کمتر از حداقل بازه باشد.");
  //     } else {
  //       callback();
  //     }
  //   };

  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="نام دسته بندی"
            rules={[
              { required: true, message: ".لطفا نام را وارد کنید" },
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
              { required: true, message: ".لظفا روش تولید را انتخاب نمایید" },
            ]}
          >
            <Select
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
            rules={[
              {
                required: true,
                message: ".لطفا وضغیت فعال/غیرفعال بودن را انتخاب نمایید",
              },
            ]}
          >
            <Select
              defaultValue={"فعال"}
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
            rules={[
              {
                required: true,
                message: ".لطفا دانسیته را انتخاب نمایید ",
              },
            ]}
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
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              // rules={[
              //   {
              //     validator(rule, value, callback) {
              //       if (value > form.getFieldValue("densityUpperLimit"))
              //         callback(
              //           "حداقل بازه نمی تواند از حداکثر بازه بیشتر باشد"
              //         );
              //     },
              //   },
              // ]}
              name="densityLowerLimit"
              label="حداقل بازه"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              // rules={[
              //   {
              //     validator(rule, value, callback) {
              //       if (value < form.getFieldValue("densityLowerLimit"))
              //         callback("حداکثر بازه نمی توانداز حداقل بازه کمتر باشد");
              //     },
              //   },
              // ]}
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
