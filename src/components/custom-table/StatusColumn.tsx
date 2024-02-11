import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const StatusColumn = ({ record }: { record: any }) => {
  let color = "";
  let name = "";
  let icon = <></>;
  if (record.isActive === true) {
    color = "success";
    name = "فعال";
    icon = <CheckCircleOutlined />;
  } else {
    color = "red";
    name = "غیرفعال";
    icon = <CloseCircleOutlined />;
  }

  return (
    <Tag className='p-1' icon={icon} color={color}>
      {name}
    </Tag>
  );
};

export default StatusColumn;
