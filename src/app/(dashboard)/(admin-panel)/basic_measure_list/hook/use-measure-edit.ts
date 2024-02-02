import useMeasureGetData from "@/hooks/basic/measure/use-measure-get";
import useMeasureUpdate from "@/hooks/basic/measure/use-measure-update";
import { useValidation } from "@/hooks/use-validation";
import measureApi from "constance/measure";
import { useEffect } from "react";
import { z } from "zod";

const apiData = measureApi.MeasureUpdate;

const useMeasureEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void
) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useMeasureGetData(uid as string);

  const closeModal = () => {
    setUid(undefined);
    form.resetFields();
  };

  useEffect(() => {
    if (get?.data) {
      form.setFieldsValue(get?.data);
    }
  }, [get.data]);

  const handleSubmit = async (data: z.infer<typeof apiData.type>) => {
    data.uid = uid;
    const res = await update.mutateAsync(data);
    if (res.success) {
      setUid(undefined);
      form.resetFields();
    }
  };

  const update = useMeasureUpdate();

  return {
    get,
    update,
    form,
    rules,
    handleSubmit,
    closeModal,
  };
};
export default useMeasureEdit;
