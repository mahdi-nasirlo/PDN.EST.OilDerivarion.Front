import React, { useState } from 'react';
import { Form, TreeSelect } from 'antd';
import { TreeNode } from 'antd/es/tree-select';

const { SHOW_PARENT } = TreeSelect;

interface IndexProps {
    name: string;
    label: string;
    data: any;
    isLoading: boolean;
}

const Index: React.FC<IndexProps> = ({ data, isLoading, name, label }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const treeNodes = mapDataToTree(data);

    return (
        <>
            <Form.Item name={name} label={label} rules={[{ required: true }]}>
                <TreeSelect
                    size="large"
                    className="w-full"
                    loading={isLoading}
                    value={selectedItems}
                    onChange={setSelectedItems}
                    treeCheckable
                    showCheckedStrategy={SHOW_PARENT}
                    placeholder="انتخاب کنید"
                    treeDefaultExpandAll
                    allowClear
                >
                    {treeNodes}
                </TreeSelect>
            </Form.Item>
        </>
    );
};

const mapDataToTree = (data: any[]) => {
    const buildTree = (items: any[] = [], parentValue?: string): React.ReactNode[] =>
        items
            .filter((item) => (parentValue ? item.ParentUid === parentValue : !item.ParentUid))
            .map((item) => {
                const children = buildTree(items, item.Uid);

                const nodeStyle = {
                    fontSize: '1rem',
                    paddingTop: 4,
                    paddingLeft: 4,
                    paddingRight: 0,
                };

                return (
                    <TreeNode
                        key={item.Uid}
                        value={item.Uid}
                        title={item.Name}
                        disabled={children.length > 0}
                        style={nodeStyle}
                    >
                        {children}
                    </TreeNode>
                );
            });

    return buildTree(data);
};

export default Index;