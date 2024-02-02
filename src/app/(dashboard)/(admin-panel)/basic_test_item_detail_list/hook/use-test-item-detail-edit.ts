import useTestItemDetailGet from "@/hooks/basic/test-item-detail/use-test-item-detail-get";
import useTestItemDetailUpdate from "@/hooks/basic/test-item-detail/use-test-item-detail-update";
import { useValidation } from "@/hooks/use-validation";
import { TestItemDetailApi } from "constance/test-item-detail";
import { useEffect } from "react";
import { z } from "zod";

const apiData = TestItemDetailApi.BasicTestItemDetailUpdate;

const useTestItemDetailEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void
) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useTestItemDetailGet(uid as string);

  const update = useTestItemDetailUpdate();

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
export default useTestItemDetailEdit;
