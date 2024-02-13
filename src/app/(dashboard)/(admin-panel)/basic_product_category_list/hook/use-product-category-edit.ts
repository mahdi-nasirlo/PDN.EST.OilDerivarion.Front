import { useEffect, useState } from "react";
import { z } from "zod";
import { productCategoryApi } from "constance/product-category";
import { useValidation } from "@/hooks/use-validation";
import useBasicProductCategoryGet from "@/hooks/basic/product-category/use-product-category-get";
import { useProductCategoryUpdate } from "@/hooks/basic/product-category/use-product-category-update";

const apiData = productCategoryApi.BasicProductCategoryUpdate;

const useProductCategoryEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void,
  setHasDensity: any
) => {
  const [form, rules] = useValidation(apiData.type);

  const get = useBasicProductCategoryGet(uid as string);

  const update = useProductCategoryUpdate();

  const [density, setDensity] = useState<boolean>();

  useEffect(() => {
    if (get.data && get.data[0]) {
      form.setFieldsValue(get.data[0]);
      setDensity(get.data[0].hasDensity);
      setHasDensity(density);
    }
  }, [get.data]);

  const handleSubmit = async (data: z.infer<typeof apiData.type>) => {
    const res = await update.mutateAsync({
      ...data,
      uid,
    });

    if (res.success) {
      setUid(undefined);
      setHasDensity(false);
      form.resetFields();
    }
  };

  const closeModal = () => {
    if (!get.isLoading) {
      setUid(undefined);
      setHasDensity(false);
      form.resetFields();
    }
  };

  return {
    get,
    density,
    update,
    form,
    rules,
    handleSubmit,
    closeModal,
  };
};

export default useProductCategoryEdit;
