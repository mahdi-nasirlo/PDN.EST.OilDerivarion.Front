import React from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const WorkFlowStatusColumn = ({ record }: { record: any }) => {
  console.log(record);
  let color = "";
  let name = "";
  let icon = <></>;
  if (record.Wrork_State === 0) {
    color = "red";
    name = "بررسی نشده";
    icon = <CloseCircleOutlined />;
  } else if (record.Wrork_State === 1) {
    color = "orange";
    name = "درحال بررسی";
    icon = <CheckCircleOutlined />;
  } else if (record.Wrork_State === 2) {
    color = "red";
    name = "رد شده";
    icon = <ClockCircleOutlined />;
  } else if (record.Wrork_State === 3) {
    color = "success";
    name = "تایید";
    icon = <InfoCircleOutlined />;
  }

  return (
    <Tag icon={icon} color={color}>
      {name}
    </Tag>
  );
};

export default WorkFlowStatusColumn;
