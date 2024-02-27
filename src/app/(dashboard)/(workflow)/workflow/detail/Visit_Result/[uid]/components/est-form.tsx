import { Form, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { Checkbox, Col, Divider, Input, Row } from "antd/lib";
import useUiVisitResult from "../hook/use-ui-visit-result";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import useUiVisitResultWorkFlow from "@/app/(dashboard)/(workflow)/workflow/detail/Visit_Result/[uid]/hook/use-ui-visit-result-work-flow";
import { useCheckReportSeen } from "@/providers/workflow-provider";

export const EstForm = ({
  uid,
  isSeenReport,
}: {
  uid?: string;
  isSeenReport: boolean;
}) => {
  const { handleSubmitEst, getTime, addTime } = useUiVisitResult({ uid });

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);

  const { get, set, choice, setChoice } = useUiVisitResultWorkFlow({
    taskId: uid as string,
  });

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده استاندارد
        </Typography>
      </div>
      <Spin spinning={getTime.isFetching || addTime.isPending}>
        <Form
          initialValues={{
            is_naft_peresent: true,
            is_samt_peresent: true,
            is_est_peresent: true,
          }}
          form={form}
          disabled={getTime.data?.visit_Type !== 3}
          layout="vertical"
          className="mb-5"
          onFinish={async (values) => {
            const res = await handleSubmitEst(values);

            if (res.success) {
              await set.mutateAsync({
                taskId: uid as string,
                stepKey: "Visit_Result",
                choiceKey: choice,
              });
            }
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                required={false}
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  {
                    max: 500,
                    message: "رشته باید حداکثر دارای 500 کاراکتر باشد",
                  },
                ]}
                name="est_opinion_1"
                label="توضیحات"
              >
                <Input.TextArea
                  style={{ resize: "none", minHeight: 85 }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="is_naft_peresent"
                valuePropName="checked"
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
              >
                <Checkbox>حضور نماینده نفت</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                valuePropName="checked"
                required={false}
                // rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="is_samt_peresent"
              >
                <Checkbox>حضور نماینده صمت</Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                valuePropName="checked"
                required={false}
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="is_est_peresent"
              >
                <Checkbox>حضور نماینده استاندارد</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          {getTime.data?.visit_Type == 3 && (
            <>
              <Divider />
              <WorkflowBtn
                disable={!isSeenReport}
                loading={set.isPending}
                choices={get.data?.choices}
                onClick={async (choice_Key) => {
                  setChoice(choice_Key);
                  form.submit();
                }}
              />
            </>
          )}
        </Form>
      </Spin>
    </>
  );
};
