import { useTestItemDetailCreate } from "@/hooks/basic/test-item-detail/use-test-item-detail-create";
import useTestItemDetailGet from "@/hooks/basic/test-item-detail/use-test-item-detail-get";
import { useTestItemDetailGetPage } from "@/hooks/basic/test-item-detail/use-test-item-detail-get-page";
import useTestItemDetailUpdate from "@/hooks/basic/test-item-detail/use-test-item-detail-update";
import { useState } from "react";

const useTestItemDetail = () => {
  const [getUid, setGetUid] = useState<string | boolean>();

  const dataPage = useTestItemDetailGetPage();

  const create = useTestItemDetailCreate();

  const get = useTestItemDetailGet(getUid as string);

  const update = useTestItemDetailUpdate();

  const handleGet = () => {
    setGetUid(getUid as string);
  };

  return {
    setGetUid,
    getUid,
    update,
    dataPage,
    create,
    handleGet,
    get,
    setUid: (uid?: string) => setGetUid(uid),
  };
};
export default useTestItemDetail;
