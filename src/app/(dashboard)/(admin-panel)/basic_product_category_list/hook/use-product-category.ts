import { useProductCategoryGetPage } from "@/hooks/basic/product-category/use-product-category-get-page";

const useProductCategory = () => {
  const dataPage = useProductCategoryGetPage();

  return { dataPage };
};
export default useProductCategory;
