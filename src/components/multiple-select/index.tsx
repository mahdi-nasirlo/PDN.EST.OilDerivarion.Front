import React, { useEffect } from "react";
import { TreeSelect } from "antd";
import { TreeSelectProps } from "antd/lib";

interface InputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const MultipleSelect: React.FC<InputProps & TreeSelectProps> = (props) => {
  useEffect(() => {
    if (!props?.value && props?.onChange) {
      props?.onChange([]);
    }
  });

  return (
    <>
      <TreeSelect
        placeholder="انتخاب کنید"
        size="large"
        className="w-full"
        treeCheckable
        showSearch
        filterTreeNode={(input, node) =>
          `${node.label}`.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        treeDefaultExpandAll
        allowClear
        {...props}
        value={props?.value ? props.value : []}
      />
    </>
  );
};

export default MultipleSelect;
