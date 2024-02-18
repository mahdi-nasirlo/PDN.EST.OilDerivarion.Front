import { Form, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { Alert, Button, Checkbox, Col, Input, Row } from "antd/lib";
import useUiVisitResult from "../hook/use-ui-lab-visit-result";
import useUiLabVisitResult from "../hook/use-ui-lab-visit-result";

export const EstForm = ({ uid }: { uid?: string }) => {
  const { handleSubmitEst, getTime, addTime } = useUiLabVisitResult({ uid });

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  const [state, setState] = useState<boolean>(false);
  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده استاندارد
        </Typography>
      </div>

      <Spin spinning={getTime.isFetching || addTime.isPending}>
        <Form
          form={form}
          disabled={getTime.data?.visit_Type !== 3 || getTime.data.ReadOnly}
          layout="vertical"
          className="mb-5"
          onFinish={handleSubmitEst}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="est_opinion_2"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          {getTime.data?.visit_Type == 3 && !getTime.data?.ReadOnly && (
            <Row gutter={[32, 0]}>
              <Col xs={24} md={24}>
                <Button
                  className="w-full"
                  size="large"
                  type={"primary"}
                  htmlType="submit"
                >
                  ثبت
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Spin>
    </>
  );
};
