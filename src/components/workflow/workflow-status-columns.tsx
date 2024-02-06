import React from "react";
import {Tag} from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined,} from "@ant-design/icons";

const WorkFlowStatusColumn = ({ record }: { record: any }) => {
  let color = "";
  let name = "";
  let icon = <></>;
  if (record.Status === 0) {
    color = "warning";
    name = "بررسی نشده";
    icon = <ClockCircleOutlined/>;
  } else if (record.Status === 1) {
    color = "success";
    name = "انجام شده";
    icon = <CheckCircleOutlined />;
  } else if (record.Status === 2) {
    color = "error";
    name = "رد شده";
    icon = <CloseCircleOutlined/>;
  }

  return (
      <Tag icon={icon} color={color}>
      {name}
    </Tag>
  );
};

export default WorkFlowStatusColumn;
