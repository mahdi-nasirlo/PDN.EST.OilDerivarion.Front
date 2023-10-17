import useSWRMutation from "swr/mutation";
import {listFetcher} from "../../lib/server/listFetcher";

interface ReturnedType {
    selectableProduct: any,
    isLDSelectable: boolean,
    getSelectableProduct: (arg: { densityTypeId: number, requestMasterUid: string }) => void
}

const UseGetAllProductSelectable = (): ReturnedType => {

    const {
        data: selectableProduct,
        isMutating: isLDSelectable,
        trigger: getSelectableProduct
    } = useSWRMutation("/RequestDetail/GetAllProductSelectable", listFetcher);

    return {selectableProduct, isLDSelectable, getSelectableProduct}

};

export default UseGetAllProductSelectable;