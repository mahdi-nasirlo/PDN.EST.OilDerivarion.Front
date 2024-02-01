import React from 'react';
import {Form} from "antd";
import {FormItemProps} from "antd/lib";

const FormItem = (props: FormItemProps) => {
    return (
        <Form.Item style={{marginBottom: 0}} {...props} labelCol={{span: 24}}>
            {props.children}
        </Form.Item>
    );
};

export default FormItem;