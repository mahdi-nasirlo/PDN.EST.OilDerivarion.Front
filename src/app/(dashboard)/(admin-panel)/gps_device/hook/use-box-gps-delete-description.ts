import useBoxGPSDelete from "@/hooks/box-gps/use-box-gps-delete";
import { useValidation } from "@/hooks/use-validation";
import { boxGPSApi } from "constance/box-gps";
import { z } from "zod";

const apiData = boxGPSApi.BoxGPSDelete;

const useBoxGpsDeleteDescription = (
  uidDelete: string,
  setUidDelete: (arg: string | undefined) => void
) => {
  const [form, rules] = useValidation(apiData.type);

  const Delete = useBoxGPSDelete();

  const handelDelete = async (values: z.infer<typeof apiData.type>) => {
    const res = await Delete.mutateAsync({
      ...values,
      uid: uidDelete as string,
    });

    if (res.success) {
      setUidDelete(undefined);
    }
  };

  const closeModal = () => {
    if (!Delete.isPending) {
      setUidDelete(undefined);
      form.resetFields();
    }
  };

  return { form, rules, handelDelete, closeModal, Delete };
};

export default useBoxGpsDeleteDescription;
