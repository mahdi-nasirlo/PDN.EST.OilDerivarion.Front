import { useTestItemGetPage } from "@/hooks/basic/test_item/use-test-item-get-page";

const useTestItem = () => {
  const dataPage = useTestItemGetPage();

  return { dataPage };
};
export default useTestItem;
