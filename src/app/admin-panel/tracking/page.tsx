"use client";

import React from "react";

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
