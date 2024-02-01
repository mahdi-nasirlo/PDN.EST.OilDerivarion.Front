import {Select} from "antd";
import React from "react";
import {SelectProps} from "antd/lib";
import {useMaterialGetAll} from "@/hooks/material/use-material-get-all";


const MaterialSelectField = (props: SelectProps) => {

    const materials = useMaterialGetAll()

    return <Select
        {...props}
        showSearch
        options={materials.options}
        size="large"
        placeholder="انتخاب نمایید"
        tokenSeparators={[","]}
    />
}

export {MaterialSelectField}