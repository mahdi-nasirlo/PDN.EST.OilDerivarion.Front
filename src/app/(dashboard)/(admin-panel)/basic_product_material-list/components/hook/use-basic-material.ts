import useBasicProductMaterialList from "@/hooks/material/use-basic-product-material-list"
import useBasicTestItemsList from "@/hooks/material/use-basic-testitems-list"

const useBasicMaterial =()=>{

const list= useBasicProductMaterialList()
const testItem =useBasicTestItemsList()

return {list,testItem}
}
export default useBasicMaterial