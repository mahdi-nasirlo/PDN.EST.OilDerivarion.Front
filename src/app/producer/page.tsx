"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Alert, Typography } from "antd";
import React from "react";

export default function Home() {

  return (
    <>
      <div className="box-border w-full p-6">
        <Typography className="mb-5 text-gray-901 font-medium text-xl text-right">
          <HomeOutlined width={24} height={24} className="text-xl p-2" />
          خانه
        </Typography>
        <Alert
          message="توجه !"
          description="اطلاعات موجود در پنل ادمین، اطلاعات پایه و اصلی است. لطفا از تغییر آن خودداری فرمایید."
          type="warning"
          showIcon
          className="text-right mb-12"
        />
      </div>
    </>
  );
};
