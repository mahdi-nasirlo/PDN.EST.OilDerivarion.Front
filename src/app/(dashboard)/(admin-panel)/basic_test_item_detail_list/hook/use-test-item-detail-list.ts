import { useTestItemDetailGetPage } from "@/hooks/basic/test-item-detail/use-test-item-detail-get-page";

const useTestItemDetail = () => {
  const dataPage = useTestItemDetailGetPage();

  return { dataPage };
};
export default useTestItemDetail;
