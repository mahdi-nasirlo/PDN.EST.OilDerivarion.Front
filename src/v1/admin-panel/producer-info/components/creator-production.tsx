"use client";

import { Divider } from "antd";
import { Typography } from "antd/lib";
import React from "react";
import ManagementInfo from "./management-info";

export default function CreatorProduction() {
  return (
    <>
      <div className="box-border w-full p-6">
        <Typography className="flex">
          لطفا اطلاعات خواسته شده را با دقت بررسی و سپس اطلاعات زیر را تایید
          نمایید.
        </Typography>
        <Divider />
        <Typography className="flex text-secondary-500 mb-6 font-medium">
          اطلاعات واحد تولیدی{" "}
        </Typography>

        <Divider />
        <ManagementInfo />
      </div>
    </>
  );
}
