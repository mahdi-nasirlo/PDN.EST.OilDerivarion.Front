import useBoxGPSGet from "@/hooks/box-gps/use-box-gps-get";
import useBoxGPSUpdate from "@/hooks/box-gps/use-box-gps-update";
import { useValidation } from "@/hooks/use-validation";
import { boxGPSApi } from "constance/box-gps";

import { useEffect } from "react";
import { z } from "zod";

const apiData = boxGPSApi.BoxGPSUpdate;

const useBoxGPSDetailEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void
) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useBoxGPSGet(uid as string);

  const update = useBoxGPSUpdate();

  useEffect(() => {

    console.log(get.data, boxGPSApi.BoxGPSUpdate.type.shape);
    
    if (get.data) {
      form.setFieldsValue(get.data);
    }
  }, [get.data]);

  const handleSubmit = async (data: z.infer<typeof apiData.type>) => {
    const res = await update.mutateAsync({
      ...data,
      uid,
    });

    if (res.success) {
      setUid(undefined);
    }
  };

  const closeModal = () => {
    if (!get.isLoading) {
      setUid(undefined);
      form.resetFields();
    }
  };

  return {
    get,
    update,
    form,
    rules,
    handleSubmit,
    closeModal,
  };
};
export default useBoxGPSDetailEdit;
