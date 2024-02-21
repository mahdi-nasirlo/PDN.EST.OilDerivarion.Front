import { SelectProps } from "antd/lib";
import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";
import { Select } from "antd";
import { filterOption } from "@/lib/filterOption";


const StateSelectField = (props: SelectProps) => {

    const materials = useGetAllState()

    return <Select
        {...props}
        showSearch
        options={materials.treeData}
        loading={materials.isLoading}
        filterOption={filterOption}
        size="large"
        placeholder="انتخاب نمایید"
        tokenSeparators={[","]}
    />
}

export { StateSelectField }