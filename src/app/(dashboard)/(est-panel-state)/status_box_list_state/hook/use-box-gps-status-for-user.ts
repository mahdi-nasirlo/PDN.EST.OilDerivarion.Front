import useBoxGPSGet from "@/hooks/box-gps/use-box-gps-get";
import useBoxGPSUpdate from "@/hooks/box-gps/use-box-gps-update";
import { useValidation } from "@/hooks/use-validation";
import { boxGPSApi } from "constance/box-gps";
import { useEffect } from "react";
import { z } from "zod";

const apiData = boxGPSApi.BoxGPSUpdateForExpert;

interface TProps {
  uid: string | undefined;
  setUid: (arg: string | undefined) => void;
}
const useBoxGpsStatusForUser = ({ uid, setUid }: TProps) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useBoxGPSGet(uid as string);

  const update = useBoxGPSUpdate();

  useEffect(() => {
    if (get.data) {
      form.setFieldsValue(get.data);
    }
  }, [get.data]);

  const handleSubmit = async (data: z.infer<typeof apiData.type>) => {
    const res = await update.mutateAsync({
      ...data,
      uid: uid as string,
    });
    if (res.success) {
      setUid(undefined);
      form.resetFields();
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

export default useBoxGpsStatusForUser;
