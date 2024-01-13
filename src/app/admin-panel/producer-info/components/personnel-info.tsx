"use client";

import { Divider } from "antd";
import { Typography } from "antd/lib";
import React from "react";
import ContactInfo from "./contact-info";

export default function PersonnelInfo() {
  return (
    <>
      <Typography className="flex text-secondary-500 mb-6 font-medium">
        اطلاعات پرسنلی
      </Typography>
      <Divider />
      <ContactInfo />
    </>
  );
}
