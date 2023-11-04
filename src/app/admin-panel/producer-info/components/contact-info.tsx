"use client";

import { Divider } from "antd";
import { Typography } from "antd/lib";
import React from "react";

export default function ContactInfo() {
  return (
    <>
      <Typography className="flex text-secondary-500 mb-6 font-medium">
        اطلاعات تماس{" "}
      </Typography>
      <Divider />
    </>
  );
}
