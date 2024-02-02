import { useProductCategoryCreate } from "@/hooks/basic/product-category/use-product-category-create";
import useBasicProductCategoryGet from "@/hooks/basic/product-category/use-product-category-get";
import { useProductCategoryGetPage } from "@/hooks/basic/product-category/use-product-category-get-page";
import { useProductCategoryUpdate } from "@/hooks/basic/product-category/use-product-category-update";
import { useState } from "react";

const useProductCategory = () => {
  const dataPage = useProductCategoryGetPage();

  const create = useProductCategoryCreate();

  const [uid, setUid] = useState<string | boolean>();

  const get = useBasicProductCategoryGet(uid as string);

  const update = useProductCategoryUpdate();

  return {
    dataPage,
    create,
    get,
    uid,
    setGetUid: (uid?: string) => setUid(uid),
    update,
  };
};
export { useProductCategory };
