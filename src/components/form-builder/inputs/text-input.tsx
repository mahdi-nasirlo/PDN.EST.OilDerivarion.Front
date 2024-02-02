import React from 'react';
import {InputProps} from "antd/lib";
import {Input} from "antd";


const TextInput: React.FC<InputProps> = ({value, onChange, ...props}) => {

    return <Input size="large" value={value} onChange={onChange} {...props}/>
};

export default TextInput;