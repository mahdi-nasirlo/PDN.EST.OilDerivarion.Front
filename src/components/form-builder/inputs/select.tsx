import React from 'react';
import {SelectProps} from "antd/lib";
import {Select as AntSelect} from "antd";

interface PropsType {
    data: any
}


const Select: React.FC<SelectProps> = ({value, onChange, ...props}) => {
// const Select = (props: InputProps & PropsType) => {

    // if (!props.data) return "select no data"
    //
    // const {data} = props


    // const options: SelectProps["options"] = data?.FormFieldDetails?.map((value, index) => ({
    //     value: value.Value,
    //     label: value.Text
    // }))

    return (
        <AntSelect
            {...props}
            value={value}
            onChange={onChange}
            allowClear
            size="large"
            // placeholder={props.data.Placeholder || "انتخاب کنید"}
        >
            {/*{props.data.FormFieldDetails?.map((value, index) => <Option*/}
            {/*    key={`${index}`}*/}
            {/*    value={value.Text}*/}
            {/*>*/}
            {/*    {value.Text}*/}
            {/*</Option>)}*/}
        </AntSelect>
    );
};

export default Select;