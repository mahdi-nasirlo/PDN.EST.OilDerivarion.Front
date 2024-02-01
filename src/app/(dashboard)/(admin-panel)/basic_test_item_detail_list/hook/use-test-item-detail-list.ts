import { useTestItemDetailCreate } from "@/hooks/basic/test-item-detail/use-test-item-detail-create";
import { useTestItemDetailGetPage } from "@/hooks/basic/test-item-detail/use-test-item-detail-get-page";

const useTestItemDetail = () => {
  const dataPage = useTestItemDetailGetPage();

  const create = useTestItemDetailCreate();

  return { dataPage, create };
};
export default useTestItemDetail;
