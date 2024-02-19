import { useState } from "react";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import { useForm } from "antd/es/form/Form";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import { useRouter } from "next/navigation";
import { useRequestPackageReportList } from "@/hooks/request-package/use-request-package-report-list";

const stepKey = "Visit_Schedule";

const useUiVisitSchedule = ({ taskId }: { taskId: string }) => {
  const [choice, setChoice] = useState<string>();

  const get = useGetTask({ taskId: taskId, stepKey });

  const set = useSetTask();

  const [form] = useForm();

  const reports = useRequestPackageReportList({
    step_Key: stepKey,
    package_UID: taskId,
  });

  const dataForm = useRequestPackageVisitScheduleList({
    package_UID: taskId,
  });

  const router = useRouter();

  const handleSet = async (values: any) => {
    const res = await set.mutateAsync({
      taskId: taskId,
      stepKey,
      description: values.description,
      date: values.date,
      choiceKey: choice,
    });

    if (res.success) {
      router.push(`/workflow/list/Visit_Schedule`);
    }
  };

  return {
    handleSet,
    dataForm,
    reports: reports,
    form,
    set,
    get,
    choice,
    setChoice,
  };
};

export default useUiVisitSchedule;
