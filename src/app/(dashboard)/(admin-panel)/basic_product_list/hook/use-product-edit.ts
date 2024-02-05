import { z } from "zod";
import { useEffect } from "react";
import { useValidation } from "@/hooks/use-validation";
import { productApi } from "constance/product";
import useBasicProductGet from "@/hooks/basic/product/use-product-get";
import { useProductUpdate } from "@/hooks/basic/product/use-product-update";

const apiData = productApi.BasicProductUpdate;

const useProductEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void
) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useBasicProductGet(uid as string);

  const update = useProductUpdate();

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

export default useProductEdit;
