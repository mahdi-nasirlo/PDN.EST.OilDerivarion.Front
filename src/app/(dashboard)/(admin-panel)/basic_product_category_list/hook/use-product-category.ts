import useProductCategoryCreate from "@/hooks/basic/product-category/use-product-category-create";
import { useProductCategoryGetPage } from "@/hooks/basic/product-category/use-product-category-get-page";

const useProductCategory = () => {
  const dataPage = useProductCategoryGetPage();

  const create = useProductCategoryCreate();

  return { dataPage, create };
};
export default useProductCategory;
