import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/lib';

const { SHOW_PARENT } = TreeSelect;

interface InputProps {
    value?: string[],
    onChange?: (value: string[]) => void;
}

const MultipleSelect: React.FC<InputProps & TreeSelectProps> = (props) => {

    const [selectedItems, setSelectedItems] = useState<string[]>(props.value || []);


    return (
        <>

            <TreeSelect
                placeholder="انتخاب کنید"
                value={selectedItems}
                size="large"
                className="w-full"
                treeCheckable
                showCheckedStrategy={SHOW_PARENT}
                treeDefaultExpandAll
                allowClear
                {...props}
            />
        </>
    );
};


export default MultipleSelect;