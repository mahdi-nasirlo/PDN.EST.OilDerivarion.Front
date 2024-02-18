import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { RequestPackageApi } from "constance/request-package";
import useRequestPackageLabSampleList from "@/hooks/request-package/use-request-package-lab-sample-list";
import useLabSampleTestItemList from "@/hooks/request-package/use-request-package-lab-sample-testItem-list";

const apiData = RequestPackageApi.LabSampleList;

const useBattleSelect = (data: z.infer<typeof apiData.type>) => {
  const [form] = useForm();

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
  };
};

export default useBattleSelect;
