import React from 'react';
import {InputNumber, InputNumberProps} from 'antd';

// import {FormBuilderInputType} from '../index';


const NaturalNumber: React.FC<InputNumberProps> = ({...props}) => {

    return (
        <InputNumber
            className="w-full"
            size="large"
            placeholder='وارد کنید'
            // defaultValue={data?.Default_Value as any}
            {...props}
        />
    );
};

export default NaturalNumber;
