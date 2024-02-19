import { useState } from "react";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import UseFinalResultList from "@/hooks/request-package/use-final-result-list";
import { useRequestPackageReportList } from "@/hooks/request-package/use-request-package-report-list";

const stepKey = "Experts_Result_Confirm";

const useUiOpinionFormWorkFlow = ({ taskId }: { taskId: string }) => {
  const [choice, setChoice] = useState<string>();

  const get = useGetTask({ taskId: taskId, stepKey });

  const set = useSetTask();

  const [form] = useForm();

  const reports = useRequestPackageReportList({
    step_Key: stepKey,
    package_UID: taskId,
  });

  const dataForm = UseFinalResultList({
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

  return {
    handleSet,
    dataForm,
    reports,
    form,
    set,
    get,
    choice,
    setChoice,
  };
};

export default useUiOpinionFormWorkFlow;
