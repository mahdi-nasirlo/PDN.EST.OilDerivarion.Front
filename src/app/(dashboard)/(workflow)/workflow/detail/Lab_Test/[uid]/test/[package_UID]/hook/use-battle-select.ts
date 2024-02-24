import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { RequestPackageApi } from "constance/request-package";
import useRequestPackageLabSampleList from "@/hooks/request-package/use-request-package-lab-sample-list";
import useLabSampleTestItemList from "@/hooks/request-package/use-request-package-lab-sample-testItem-list";

const apiData = RequestPackageApi.LabSampleList;

const useBattleSelect = (data: z.infer<typeof apiData.type>) => {
  const [form] = useForm();

  const [Battle, setBattle] = useState<{
    Sample_Code: string | undefined;
    Lab_Is_Finished: boolean | undefined;
  }>();

  const LabSampleList = useRequestPackageLabSampleList({
    package_UID: data.package_UID,
  });

  const LabSampleTestItemList = useLabSampleTestItemList({
    package_UID: data.package_UID,
    sample_Code: Battle?.Sample_Code as string,
  });

  useEffect(() => {
    setBattle({
      Lab_Is_Finished: LabSampleList.data?.[0].Lab_Is_Finished,
      Sample_Code: LabSampleList.data?.[0].Sample_Code,
    });
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
