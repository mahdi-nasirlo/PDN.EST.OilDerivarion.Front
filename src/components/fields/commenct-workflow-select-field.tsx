import { Select } from "antd";
import React from "react";
import { SelectProps } from "antd/lib";


const CommentWorkflowSelectField = (props: SelectProps) => {

    return <Select
        {...props}
        options={[
            { label: "رد می شود", value: 1 },
            { label: "تایید می شود", value: 2 },
            { label: "آزمون تکمیلی", value: 3 }
        ]}
        size="large"
        placeholder="انتخاب نمایید"
    />
}

export { CommentWorkflowSelectField }