import React, { useEffect, useState } from 'react';
import { Form, Input, Select, TreeSelect, Typography } from 'antd';
import { TreeNode } from 'antd/es/tree-select';
import { Option } from 'antd/lib/mentions';
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