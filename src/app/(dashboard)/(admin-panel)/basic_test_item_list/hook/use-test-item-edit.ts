import useTestItemGet from "@/hooks/basic/test_item/use-test-item-get";
import useTestItemUpdate from "@/hooks/basic/test_item/use-test-item-update";
import { useValidation } from "@/hooks/use-validation";
import { TestItemApi } from "constance/test-item";
import { useEffect } from "react";
import { z } from "zod";

const formSchema = TestItemApi.BasicTestItemUpdate.type;

const useTestItemEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void
) => {
  const get = useTestItemGet(uid as string);

  const update = useTestItemUpdate();

  const [form, rules] = useValidation(formSchema);

  useEffect(() => {
    if (get?.data) {
      form.setFieldsValue(get?.data[0]);
    }
  }, [get.data]);

  const handleSubmit = async (
    data: z.infer<typeof TestItemApi.BasicTestItemUpdate.type>
  ) => {
    data.uid = uid;
    const res = await update.mutateAsync(data);
    if (res) {
      setUid(undefined);
      form.resetFields();
    }
  };

  const closeModal = () => {
    setUid(undefined);
    form.resetFields();
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
export default useTestItemEdit;
