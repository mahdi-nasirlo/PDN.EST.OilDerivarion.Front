import { InputProps, TreeSelect, TreeSelectProps } from "antd/lib";
import React, { useEffect } from "react";
import MultipleSelect from "../multiple-select";
import { useTestItemList } from "@/hooks/basic/test_item/use-test-item-list";

const TestItemsMultipeSelectField: React.FC<TreeSelectProps> = (props) => {
  const testItem = useTestItemList();

  useEffect(() => {
    console.log(testItem.data);
  }, [props.value, testItem.data]);

  return (
    <TreeSelect
      allowClear
      treeCheckable
      filterTreeNode={(input, node) =>
        `${node.label}`.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      fieldNames={{ label: "name", value: "uid" }}
      loading={testItem.isLoading}
      treeData={testItem.treeData}
      value={[
        "E19EC4B9-CAAD-4032-8188-92BA5FE50229",
        "450AC2C8-78C0-4B62-B456-4E507F779866",
      ]}
      {...props}
    />
  );
};

export { TestItemsMultipeSelectField };
