"use client";

import { Col, Divider, Form, Input, notification, Row, Typography } from "antd";
import { Choice } from "../../../../../../interfaces/requestDetail";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import { useForm } from "antd/es/form/Form";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import GodOfDataViewer from "../../../../../../components/GodOfDataViewer";

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

const apiData = apiUrl.WorkFlowRequest.step07;

export default function Home(props: PropType) {
  const { data: barcode, isLoading: ldCategory } = useSWR<string>(
    "/RequestBarcode/FactoryBarcode",
    (url: string) =>
      listFetcher(url, {
        arg: {
          taskUid: props.params.uid,
        },
      })
  );
  const downloadPdf = (choiceKey: any) => {
    if (!barcode) {
      notification.error({ message: "فایلی وجود ندارد" });
      return;
    }

    const binaryPdf = atob(barcode);
    const arrayBuffer = new ArrayBuffer(binaryPdf.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryPdf.length; i++) {
      uint8Array[i] = binaryPdf.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "downloaded.pdf";
    link.click();
    form.submit();
    setChoice(choiceKey);
    onFinish();
  };

  const [form] = useForm();

  const [choice, setChoice] = useState<string>();

  const router = useRouter();

  const { isLoading, data } = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiData.get.url,
  });

  const { isMutating, trigger } = useSWRMutation(
    apiData.create.url,
    mutationFetcher
  );

  const onFinish = async () => {
    const data = {
      taskId: props.params.uid,
      choiceKey: choice,
    };

    const res = await trigger(data);

    if (res) router.push("/producer/step07/list");
  };

  return (
    <>
      <div className="box-border w-full p-6">
        <div className="flex justify-between flex-col">
          <div className="flex items-center gap-3">
            <Typography className="font-bold">
              داده های تجمیعی درخواست
            </Typography>
          </div>
          <Divider />
        </div>
        <GodOfDataViewer
          uid={props.params.uid}
          data={data?.tabs}
          loading={isLoading}
        />
        {/*<WorkflowDataViewer loading={isLoading} data={data as any} />*/}
        {/* {data && <Divider /> && (
          <Form onFinish={onFinish} form={form}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24}>
                <Form.Item
                  rules={[
                    { required: true, message: "لطفا مقدار را انتخاب کنید" },
                  ]}
                  wrapperCol={{ span: 24 }}
                  labelCol={{ span: 24 }}
                  name="description"
                  label="توضیحات"
                >
                  <Input.TextArea
                    style={{ height: 100, resize: "none" }}
                    placeholder="وارد کنید"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )} */}
        {/* <DateOfVisitForm form={form} onFinish={onFinish} /> */}
        {data && <Divider />}
        <WorkflowRequestBtn
          loading={isMutating}
          choices={data?.choices as any}
          onClick={(choiceKey) => {
            downloadPdf(choiceKey);
          }}
          trigger={() => true}
          nextStepUrl={apiData.create.url}
          taskId={props.params.uid}
        />
      </div>
    </>
  );
}
