import { RequestPackageApi } from "../../../../../../../../constance/request-package";
import { z } from "zod";
import useLabBoxGetAvailableList from "@/hooks/request-package/use-lab-box-get-available-list";
import useLabList from "@/hooks/request-package/use-lab-list";
import useLabBoxList from "@/hooks/request-package/use-lab-box-list";
import { useEffect, useState } from "react";
import useLabBoxAdd from "@/hooks/request-package/use-lab-box-add";
import { useForm } from "antd/lib/form/Form";
import useLabBoxDelete from "@/hooks/request-package/use-lab-box-delete";
import useLabBoxSampleDelete from "@/hooks/request-package/use-lab-box-sample-delete";

const apiData = RequestPackageApi.LabBoxGetAvailableList;

const useUiEstLabSelect = (data: z.infer<typeof apiData.type>) => {
  const [form] = useForm();

  const [lab_UID, setLab_UID] = useState<string>();

  const boxAvailable = useLabBoxGetAvailableList({
    package_UID: data.package_UID,
  });

  const labList = useLabList({ package_UID: data.package_UID });

  const deleteLabBox = useLabBoxDelete({
    package_UID: data.package_UID,
    lab_UID: lab_UID as string,
  });

  const labBoxList = useLabBoxList({
    package_UID: data.package_UID,
    lab_UID: lab_UID as string,
  });

  // useEffect(() => {
  //   if (Array.isArray(labList.data) && labList.data.length > 0) {
  //     setLab_UID(labList.data[0].Uid);
  //   }
  // }, [labList.data]);

  const labBoxAdd = useLabBoxAdd(data.package_UID);

  const handleAddBox = async ({ box_UID }: { box_UID: string }) => {
    const res = await labBoxAdd.mutateAsync({
      package_UID: data.package_UID,
      lab_UID: lab_UID as string,
      box_UID: box_UID,
    });
    if (res) {
      form.resetFields();
    }
  };

  return {
    boxAvailable,
    labList,
    setLab_UID,
    lab_UID,
    handleAddBox,
    labBoxAdd,
    form,
    labBoxList,
    deleteLabBox,
  };
};

export default useUiEstLabSelect;
