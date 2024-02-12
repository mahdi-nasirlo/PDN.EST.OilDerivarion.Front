import useBoxList from "@/hooks/request-package/use-box-list";
import useBoxAdd from "@/hooks/request-package/use-box-add";
import {useValidation} from "@/hooks/use-validation";
import {RequestPackageApi} from "../../../../../../../../constance/request-package";
import useBoxGetAvailableList from "@/hooks/request-package/use-box-get-available-list";

const useUiWorkflowBoxAdd = (package_UID: string) => {

    const [form, rules] = useValidation(RequestPackageApi.BoxAdd.type)

    const boxList = useBoxList({package_UID: package_UID})

    const boxAdd = useBoxAdd(package_UID)

    const availableBox = useBoxGetAvailableList({package_UID: package_UID, state_ID: 1})

    return {
        boxList,
        boxAdd,
        form,
        rules,
        availableBox
    }
};

export default useUiWorkflowBoxAdd;