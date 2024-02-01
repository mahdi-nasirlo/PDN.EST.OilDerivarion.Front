import React from 'react';
import {InputProps} from "antd/lib";
import {Input} from "antd";
import {z} from "zod";
import {formMakerApi} from "../../../constance/form-maker";


interface PropsType {
    data: z.infer<typeof formMakerApi.Get.formFields>
}

// const TextInput = (props: InputProps & PropsType) => {
const TextInput: React.FC<InputProps> = ({value, onChange}) => {

    // const {data} = props

    return <Input value={value} onChange={onChange}/>
    // return (
    //     // <Input className={"w-full"} {...props} defaultValue={data?.Default_Value}/>
    // );
};

export default TextInput;