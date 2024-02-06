import React from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const WorkFlowStatusColumn = ({ record }: { record: any }) => {
  let color = "";
  let name = "";
  let icon = <></>;
  if (record.Status === 0) {
    color = "red";
    name = "بررسی نشده";
    icon = <CloseCircleOutlined />;
  } else if (record.Status === 1) {
    color = "success";
    name = "انجام شده";
    icon = <CheckCircleOutlined />;
  } else if (record.Status === 2) {
    color = "orange";
    name = "درحال بررسی";
    icon = <CheckCircleOutlined />;
  } else if (record.Status === 3) {
    color = "red";
    name = "خطا";
    icon = <CheckCircleOutlined />;
  }

  return (
    <Tag icon={icon} color={color}>
      {name}
    </Tag>
  );
};

export default WorkFlowStatusColumn;
