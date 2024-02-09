import {Select} from "antd";
import React from "react";
import {SelectProps} from "antd/lib";
import {useMaterialGetAll} from "@/hooks/material/use-material-get-all";


const CommentWorkflowSelectField = (props: SelectProps) => {

    const materials = useMaterialGetAll()

    return <Select
        {...props}
        options={[
            {label: "رد می شود", value: 1},
            {label: "تایید می شود", value: 2},
            {label: "آزمون تکمیلی", value: 3}
        ]}
        size="large"
        placeholder="انتخاب نمایید"
    />
}

export {CommentWorkflowSelectField}