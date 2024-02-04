"use client";

import React from "react";
import { Card } from "@/components/card";
import { MapIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "../../../../components/breadcrumb";

const Page = () => {
  return (
    <>
      <Breadcrumb
        titleIcon={<MapIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"موقعیت آزمایشگاه ها"}
      />
      <Card>
        <iframe
          className="w-full border-2 border-CustomizeBlue-500 rounded-md"
          src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/oil/labs`}
          width="1500px"
          height="650px"
        ></iframe>
      </Card>
    </>
  );
};

export default Page;
