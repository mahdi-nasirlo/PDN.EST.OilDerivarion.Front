import React from 'react';
import {Form, Select} from "antd";

const SelectStatus = () => {
    return (
        <Select
            options={[
                {label: "فعال", value: true},
                {label: "غیر فعال", value: false},
            ]}
            size="large"
            placeholder="انتخاب کنید"
        />
    );
};

export const SelectStatusFormItem = () => {
    return (
        <Form.Item name="IsActive" label="فعال/غیر فعال">
            <SelectStatus/>
        </Form.Item>
    );
};

export default SelectStatus;