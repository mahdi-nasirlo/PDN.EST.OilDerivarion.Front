import { Form, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { Alert, Button, Checkbox, Col, Divider, Input, Row } from "antd/lib";
import useUiVisitResult from "../hook/use-ui-lab-visit-result";
import useUiLabVisitResult from "../hook/use-ui-lab-visit-result";
import useUiLabVisitResultWorkFlow from "../hook/use-ui-lab-visit-result-work-flow";
import WorkflowBtn from "@/components/workflow/workflow-btn";
import { useRouter } from "next/navigation";

export const EstForm = ({
  stepKey,
  uid,
  isSeenReport,
}: {
  stepKey: string;
  uid?: string;
  isSeenReport: boolean;
}) => {
  const { handleSubmitEst, getTime, addTime } = useUiLabVisitResult({ uid });

  const [form] = useForm();

  const { get, set, choice, setChoice } = useUiLabVisitResultWorkFlow({
    taskId: uid as string,
  });
  useEffect(() => {
    form.setFieldsValue(getTime.data);
  }, [getTime.data]);
  const router = useRouter();

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
                rules={[
                  { required: true, message: "لطفا مقدار را وارد کنید" },
                  {
                    max: 500,
                    message: "رشته باید حداکثر دارای 500 کاراکتر باشد",
                  },
                ]}
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
                  disabled={!isSeenReport}
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
          {getTime.data?.visit_Type == 3 && (
            <>
              <Divider />
              <WorkflowBtn
                loading={set.isPending}
                disable={!isSeenReport}
                choices={get.data?.choices}
                onClick={async (choice_Key) => {
                  setChoice(choice_Key);
                  form.submit();
                  const res = await set.mutateAsync({
                    taskId: uid as string,
                    stepKey,
                    choiceKey: choice_Key,
                  });
                  if (res.success) {
                    router.push(`/workflow/list/Experts_Result_Confirm`);
                  }
                }}
              />
            </>
          )}
        </Form>
      </Spin>
    </>
  );
};
