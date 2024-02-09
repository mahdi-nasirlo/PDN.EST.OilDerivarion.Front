import useBasicProductMaterialGet from "@/hooks/material/use-basic-product-material-get";
import useBasicProductMaterialUpdate from "@/hooks/material/use-basic-product-material-update";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";
import { useEffect } from "react";
import { z } from "zod";

const apiData = materialApi.BasicProductMaterialUpdate;

const useBasicMaterialEdit = (
  uid: string,
  setUid: (arg: string | undefined) => void
) => {
  const get = useBasicProductMaterialGet(uid as string);

  const update = useBasicProductMaterialUpdate();

  const [form, rules] = useValidation(apiData.type);

  useEffect(() => {
    console.log(get.data);

    if (get.data && get.data[0]) {
      form.setFieldsValue(get.data[0]);
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
  return {
    get,
    update,
    form,
    rules,
    handleSubmit,
    closeModal,
  };
};
export default useBasicMaterialEdit;
