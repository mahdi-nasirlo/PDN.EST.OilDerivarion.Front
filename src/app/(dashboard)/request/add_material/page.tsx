"use client";

import React from "react";
import { Card } from "@/components/card";
import { BeakerIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/components/breadcrumb";
import { Divider } from "antd";
import AddMaterials from "./components/add-materials";
import DatatableMaterials from "./components/datatable-materials";



const Page = () => {

    return (
        <div>
            <Breadcrumb
                pages={[{ label: "خانه", path: "/" }]}
                currentPage="لیست مواد اولیه"
                titleIcon={<BeakerIcon className="w-8" />}
                backLink="/request"
            />
            <Card>
                <AddMaterials />
                <Divider />
                <DatatableMaterials />
            </Card>
        </div>
    );
};

export default Page;
