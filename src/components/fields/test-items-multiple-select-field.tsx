import {TreeSelect, TreeSelectProps} from "antd/lib";
import React from "react";
import {useTestItemList} from "@/hooks/basic/test_item/use-test-item-list";

const TestItemsMultipleSelectField: React.FC<TreeSelectProps> = (props) => {

    const testItem = useTestItemList();

  return (
    <TreeSelect
      allowClear
      treeCheckable
      filterTreeNode={(input, node) =>
        `${node.label}`.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      loading={testItem.isLoading}
      treeData={testItem.treeData}
      {...props}
    />
  );
};

export {TestItemsMultipleSelectField};
