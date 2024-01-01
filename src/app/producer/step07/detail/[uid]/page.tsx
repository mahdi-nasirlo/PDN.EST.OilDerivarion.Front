"use client";

import { Divider, notification, Typography } from "antd";
import { apiUrl } from "../../../../../../Constants/apiUrl";
import { useForm } from "antd/es/form/Form";
import useGetStep from "../../../../../../hooks/workFlowRequest/useGetStep";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { useRouter } from "next/navigation";
import WorkflowRequestBtn from "../../../../../../components/Workflow/WorkflowRequestBtn";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import GodOfDataViewer from "../../../../../../components/GodOfDataViewer";

interface PropType {
  params: { uid: string };
}

const apiData = apiUrl.WorkFlowRequest.step07;

export default function Home(props: PropType) {
  const barcodeRequest = useSWRMutation<string>(
    "/RequestBarcode/FactoryBarcode",
    (url: string) =>
      listFetcher(url, {
        arg: {
          taskUid: props.params.uid,
        },
      })
  );
  const downloadPdf = async (choiceKey: any) => {
    await barcodeRequest.trigger();

    if (!barcodeRequest.data) {
      notification.error({ message: "فایلی وجود ندارد" });
      return;
    }

    const binaryPdf = atob(barcodeRequest.data);
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
    onFinish(choiceKey);
  };

  const [form] = useForm();

  const router = useRouter();

  const { isLoading, data } = useGetStep({
    taskId: props.params.uid,
    apiUrl: apiData.get.url,
  });

  const { isMutating, trigger } = useSWRMutation(
    apiData.create.url,
    mutationFetcher
  );

  const onFinish = async (choiceKey: string) => {
    const data = {
      taskId: props.params.uid,
      choiceKey: choiceKey,
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
        {data && <Divider />}
        <WorkflowRequestBtn
          loading={isMutating || barcodeRequest.isMutating}
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
