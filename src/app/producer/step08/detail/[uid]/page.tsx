"use client";

import {Col, Divider, Form, Input, Row} from "antd";
import {Choice} from "../../../../../../interfaces/requestDetail";
import WorkflowDataViewer from "../../../../../../components/Workflow/WorkflowDataViewer";
import {apiUrl} from "../../../../../../Constants/apiUrl";
import {useForm} from "antd/es/form/Form";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import {useState} from "react";
import {useRouter} from "next/navigation";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";

interface PropType {
  params: { uid: string };
}

interface DataFetchType {
  choices: Choice[];
  task: {
    processId: string;
    stepId: string;
    reference_ID: string;
    group_ID: string;
    step_Name: string;
    counting_position: string;
    userId: number;
  };
}

const apiData = apiUrl.WorkFlowRequest.step08;

export default function Home(props: PropType) {
  const [form] = useForm();

  const [choice, setChoice] = useState<string>();

  const router = useRouter();

  const {isLoading, data, mutate} = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiData.get.url,
  });

  const {isMutating, trigger} = useSWRMutation(
      apiData.create.url,
      mutationFetcher
  );

  const onFinish = async (values: any) => {
    const data = {
      ...values,
      taskId: props.params.uid,
      choiceKey: choice,
    };

    const res = await trigger(data);

    if (res) router.push("/producer/step08/list");
  };

  return (
      <>
        <div className="box-border w-full p-6">
          <WorkflowDataViewer loading={isLoading} data={data as any}/>
          <Form onFinish={onFinish} form={form}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24}>
                <Form.Item
                    wrapperCol={{span: 24}}
                    labelCol={{span: 24}}
                    name="description"
                    label="توضیحات"
                >
                  <Input.TextArea
                      style={{height: 100, resize: "none"}}
                      placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* <DateOfVisitForm form={form} onFinish={onFinish} /> */}
          {data && <Divider/>}
          <WorkflowRequestBtn
              loading={isMutating}
              choices={data?.choices as any}
              onClick={(choiceKey) => {
                setChoice(choiceKey);
                form.submit();
              }}
              trigger={() => true}
              nextStepUrl={apiData.create.url}
              taskId={props.params.uid}
          />
        </div>
      </>
  );
}
