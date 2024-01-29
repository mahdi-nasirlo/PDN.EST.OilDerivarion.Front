"use client";

import React from "react";
import { Card } from "@/components/card";
import { BeakerIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/components/breadcrumb";
import AddMaterils from "./add-materils";

const Page = () => {
  return (
    <div>
      <Breadcrumb
        pages={[{ label: "خانه", path: "/" }]}
        currentPage="لیست مواد اولیه"
        titleIcon={<BeakerIcon className="w-8" />}
      />
      <Card>
        <AddMaterils />
      </Card>
    </div>
  );
};

export default Page;
