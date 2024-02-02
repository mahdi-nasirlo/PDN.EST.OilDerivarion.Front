import useTestItemDetailGet from "@/hooks/basic/test-item-detail/use-test-item-detail-get";
import useTestItemDetailUpdate from "@/hooks/basic/test-item-detail/use-test-item-detail-update";
import { useTestItemCreate } from "@/hooks/basic/test_item/use-test-item-create";
import useTestItemGet from "@/hooks/basic/test_item/use-test-item-get";
import { useTestItemGetPage } from "@/hooks/basic/test_item/use-test-item-get-page";
import useTestItemUpdate from "@/hooks/basic/test_item/use-test-item-update";
import { useState } from "react";

const useTestItem = () => {
  const [getUid, setGetUid] = useState<string | boolean>();
  const dataPage = useTestItemGetPage();

  const create = useTestItemCreate();

  const get = useTestItemGet(getUid as string);

  const update = useTestItemUpdate();

  return {
    update,
    dataPage,
    create,
    get,
    setUid: (uid: string) => setGetUid(uid),
    getUid,
    setGetUid,
  };
};
export default useTestItem;
