"use client";

import React from "react";
import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import useGetAllGpsDeviceTracker from "../../../../hooks/requestGps/useGetAllGpsDeviceTracker";

const Page = () => {
  return (
    <div className="box-border p-6">
      <iframe
        className="w-full"
        src={`https://map-test.pdnsoftware.ir/oil/labs`}
        width="1500px"
        height="650px"
      ></iframe>
    </div>
  );
};

export default Page;
