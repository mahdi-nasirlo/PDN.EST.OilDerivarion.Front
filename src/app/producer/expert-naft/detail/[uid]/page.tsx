"use client";

import useSWR from "swr";

import { Button, Col, Divider, Form, Input, Modal, Row } from "antd";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { Choice } from "../../../../../../interfaces/requestDetail";
import WorkflowDataViewer from "../../../../../../components/WorkflowDataViewer";
import WorkflowRequestBtn from "../../../../../../components/WorkflowRequestBtn";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import CustomeDatePicker from "../../../../../../components/CustomeDatePicker";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { serialize } from "v8";
import { useRouter } from "next/navigation";

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

export default function Home(props: PropType) {
  const { isLoading, data, mutate } = useSWR<DataFetchType>(
    "/WorkFlowRequest/GetStep03",
    (url) =>
      listFetcher(url, {
        arg: {
          taskId: props.params.uid,
        },
      })
  );
  const { isMutating, trigger } = useSWRMutation(
    "/WorkFlowRequest/SetStep03",
    mutationFetcher
  );

  const [form] = useForm();
  const router = useRouter();
  const handleFormSubmit = async (values: any) => {
    values.taskId = props.params.uid;
    values.choiceKey = choice;
    const res = await trigger(values);
    await mutate();
    if (res) {
      setModalVisible(false);
      form.resetFields();
      router.push("/producer/expert-naft/list");
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };
  const [choice, setChoice] = useState("");

  return (
    <>
      <div className="box-border w-full p-6">
        <WorkflowDataViewer loading={isLoading} data={data as any} />
        {data && <Divider />}
        <WorkflowRequestBtn
          onClick={(choiceKey) => {
            setModalVisible(true);
            setChoice(choiceKey);
          }}
          choices={addIndexToData(data?.choices) as any}
          nextStepUrl={"/WorkFlowRequest/SetStep03"}
          taskId={data?.task.stepId as string}
        />
        <Modal
          width={800}
          title={
            <div>
              <div className="text-base mb-2">افزودن دسته بندی جدید</div>
              <div className="font-normal text-sm">
                لطفا اطلاعات را وارد نمایید.
              </div>
            </div>
          }
          open={modalVisible}
          onCancel={closeModal}
          footer={[
            <Row key={"box"} gutter={[16, 16]} className="my-2">
              <Col xs={24} md={12}>
                <Button
                  onClick={() => {
                    form.submit();
                  }}
                  size="large"
                  className="w-full"
                  type="primary"
                  key={"submit"}
                  loading={isMutating}
                >
                  ثبت
                </Button>
              </Col>
              <Col xs={24} md={12}>
                <Button
                  size="large"
                  className="w-full bg-gray-100 text-warmGray-500"
                  onClick={closeModal}
                  key={"cancel"}
                >
                  انصراف
                </Button>
              </Col>
            </Row>,
          ]}
        >
          <Form
            onFinish={handleFormSubmit}
            disabled={isMutating}
            form={form}
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  rules={[{ required: true }]}
                  name="description"
                  label=" توضیحات کارشناس نفت"
                >
                  <Input size="large" placeholder="وارد کنید" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  rules={[{ required: true }]}
                  name="datePersian"
                  label="تاریخ بازدید کارشناس نفت"
                >
                  <CustomeDatePicker />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </>
  );
}