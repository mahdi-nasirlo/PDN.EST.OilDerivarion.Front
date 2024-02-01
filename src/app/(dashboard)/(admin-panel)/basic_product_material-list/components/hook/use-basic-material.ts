import useBasicMeasureList from "@/hooks/material/use-basic-measure-list";
import useBasicProductMaterialCreate from "@/hooks/material/use-basic-product-material-create";
import useBasicProductMaterialGet from "@/hooks/material/use-basic-product-material-get";
import useBasicProductMaterialList from "@/hooks/material/use-basic-product-material-list";
import useBasicTestItemsList from "@/hooks/material/use-basic-testitems-list";
import { useState } from "react";

const useBasicMaterial = () => {
  const [uid, setUid] = useState<string | boolean>();

  const list = useBasicProductMaterialList();

  const testItem = useBasicTestItemsList();

  const measure = useBasicMeasureList();

  const create = useBasicProductMaterialCreate();

  const get = useBasicProductMaterialGet(uid as string);

  const handleEdit = () => {
    setUid(uid as string);
  };

  return {
    list,
    testItem,
    measure,
    create,
    get,
    handleEdit,
    uid,
    setGetUid: (uid?: string) => setUid(uid),
  };
};
export default useBasicMaterial;
