import React, { useState } from 'react';
import { Form, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

interface IndexProps {
    data: any;
    isLoading: any;
    name: string;
    label: string;
}

export default function Index(props: IndexProps) {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const transformedData = (props.data || []).map((item: any) => ({
        title: item.Name,
        value: item.Uid,
        key: item.Uid,
    }));

    return (
        <>
            <Form.Item
                name={props.name}
                label={props.label}
                rules={[{ required: true }]}
            >
                <TreeSelect
                    size='large'
                    className='w-full'
                    loading={props.isLoading}
                    treeData={transformedData}
                    value={selectedItems}
                    onChange={setSelectedItems}
                    treeCheckable
                    showCheckedStrategy={SHOW_PARENT}
                    placeholder="انتخاب کنید"
                />
            </Form.Item>
        </>
    );
};