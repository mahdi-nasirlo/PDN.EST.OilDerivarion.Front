import { useState } from "react";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import { useForm } from "antd/es/form/Form";
import { useGetRegisteredReportsForStepByKey } from "@/hooks/material/use-get-registered-reports-for-step-by-key";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import { useRouter } from "next/navigation";
import useRequestPackageVisitOpinionList from "@/hooks/request-package/use-request-pakage-visit-opinion-list";

const stepKey = "Visit_Result";

const useUiVisitResultWorkFlow = ({ taskId }: { taskId: string }) => {
  const [choice, setChoice] = useState<string>();

  const get = useGetTask({ taskId: taskId, stepKey });

  const set = useSetTask();

  const [form] = useForm();

  const reposts = useGetRegisteredReportsForStepByKey(stepKey, taskId);
  const dataForm = useRequestPackageVisitOpinionList({
    package_UID: taskId,
  });

  const router = useRouter();

  const handleSet = async (values: any) => {
    const res = await set.mutateAsync({
      taskId: taskId,
      stepKey,
      choiceKey: choice,
    });

    if (res.success) {
      router.push(`/workflow/list/Visit_Result`);
    }
  };

  return { handleSet, dataForm, reposts, form, set, get, choice, setChoice };
};

export default useUiVisitResultWorkFlow;
