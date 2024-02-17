import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { RequestPackageApi } from "constance/request-package";
import useRequestPackageLabSampleList from "@/hooks/request-package/use-request-package-lab-sample-list";
import useLabSampleTestItemList from "@/hooks/request-package/use-request-package-lab-sample-testItem-list";
import useGetTask from "@/hooks/workflow-request/use-get-task";
import useSetTask from "@/hooks/workflow-request/use-set-task";
import { useGetRegisteredReportsForStepByKey } from "@/hooks/material/use-get-registered-reports-for-step-by-key";
import { useRouter } from "next/navigation";

const apiData = RequestPackageApi.LabSampleList;

const stepKey = "Lab_Test";
const useBattleSelect = (data: z.infer<typeof apiData.type>) => {
  const [form] = useForm();
  const [choice, setChoice] = useState<string>();

  const get = useGetTask({ taskId: data.package_UID, stepKey });

  const set = useSetTask();

  const reposts = useGetRegisteredReportsForStepByKey(
    stepKey,
    data.package_UID
  );

  const router = useRouter();

  const handleSet = async (values: any) => {
    const res = await set.mutateAsync({
      taskId: data.package_UID,
      stepKey,
      description: values.description,
      date: values.date,
      choiceKey: choice,
    });

    if (res.success) {
      router.push(`/workflow/list/Lab_Test`);
    }
  };

  const [Battle, setBattle] = useState<string>();

  const LabSampleList = useRequestPackageLabSampleList({
    package_UID: data.package_UID,
  });

  const LabSampleTestItemList = useLabSampleTestItemList({
    package_UID: data.package_UID,
    sample_Code: Battle as string,
  });

  useEffect(() => {
    if (Array.isArray(LabSampleList.data) && LabSampleList.data.length > 0) {
      setBattle(LabSampleList.data[0].Sample_Code);
    }
  }, [LabSampleList.data]);

  return {
    form,
    Battle,
    setBattle,
    LabSampleList,
    LabSampleTestItemList,
    handleSet,
    get,
    reposts,
  };
};

export default useBattleSelect;
