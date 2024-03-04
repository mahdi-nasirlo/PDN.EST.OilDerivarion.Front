import { Tag } from "antd";
import React from "react";

interface TProps {
  record: any;
}

export default function StatusColumnBoxVisit({ record }: TProps) {
  let color = "";
  let name = "";

  if (record.Device_Status === 1) {
    color = "success";
    name = "آماده به کار";
  } else if (record.Device_Status === 2) {
    color = "processing";
    name = "در حال ارسال برای بازدید";
  } else if (record.Device_Status === 3) {
    color = "warning";
    name = "در حال ارسال به آزمایشگاه";
  } else if (record.Device_Status === 6) {
    color = "default";
    name = "برگشت";
  } else if (record.Device_Status === 7) {
    color = "cyan";
    name = "در حال شارژ";
  } else if (record.Device_Status === 8) {
    color = "orange";
    name = "انبار - خراب";
  } else if (record.Device_Status === 9) {
    color = "gold";
    name = "انبار - سالم";
  } else {
    color = "error";
    name = "عودت به مرکز";
  }

  return (
    <Tag className="p-1" color={color}>
      {name}
    </Tag>
  );
}
