import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';

interface PropsType {
    data: any;
}

const PercentInput: React.FC<InputNumberProps> = ({ value, onChange }) => {
    // const PercentInput: React.FC<InputNumberProps & PropsType> = ({data, ...props}) => {

    // const rules: Rule[] = [
    //
    //     //فقط اعداد اعشاری و مثبت بین 0 تا 100
    //     {
    //         required: true,
    //         message: 'لطفاً مقدار را وارد کنید',
    //     },
    //     {
    //         pattern: /^(?!-)(0|[1-9]\d*)(\.\d+)?$/,
    //         message: 'لطفاً عدد صحیح وارد کنید',
    //     },
    // ];

    {/*{...props}*/
    }
    return (
        <InputNumber
            value={value}
            onChange={onChange}
            max={100}
            controls={false}
            className="w-full"
            size="large"
            formatter={(value) => `${value}%`}
            placeholder='وارد کنید'
        // defaultValue={data?.Default_Value as any}
        />
    );
};

export default PercentInput;
