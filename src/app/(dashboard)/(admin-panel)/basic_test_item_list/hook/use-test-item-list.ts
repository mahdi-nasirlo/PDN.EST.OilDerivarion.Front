import { useTestItemCreate } from "@/hooks/basic/test_item/use-test-item-create";
import { useTestItemGetPage } from "@/hooks/basic/test_item/use-test-item-get-page";

const useTestItem = () => {
  const dataPage = useTestItemGetPage();

  const create = useTestItemCreate();

  return { dataPage, create };
};
export default useTestItem;
