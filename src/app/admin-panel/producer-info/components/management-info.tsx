"use client";

import { Divider } from "antd";
import { Typography } from "antd/lib";
import React from "react";
import PersonnelInfo from "./personnel-info";

export default function ManagementInfo() {
  return (
    <>
      <Typography className="flex text-secondary-500 mb-6 font-medium">
        اطلاعات مدیریتی{" "}
      </Typography>
      <Divider />
      <PersonnelInfo />
    </>
  );
}
