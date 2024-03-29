import useLabGet from "@/hooks/lab/use-lab-get";
import useLabUpdate from "@/hooks/lab/use-lab-update";
import { useValidation } from "@/hooks/use-validation";
import labApi from "constance/lab";
import { useEffect } from "react";
import { z } from "zod";

const apiData = labApi.LabUpdate;

const useLabEdit = (uid: string, setUid: (arg: string | undefined) => void) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useLabGet(uid as string);

  const update = useLabUpdate();

  useEffect(() => {
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
      form.resetFields();
    }
  };

  const closeModal = () => {
    if (!get.isLoading) {
      setUid(undefined);
      form.resetFields();
    }
  };
  return { get, form, closeModal, handleSubmit, update, rules };
};

export default useLabEdit;
