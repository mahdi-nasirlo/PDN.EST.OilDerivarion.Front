"use client";

import React from "react";
import {Card} from "@/components/card";
import {BeakerIcon} from "@heroicons/react/24/outline";
import Breadcrumb from "@/components/breadcrumb";
import AddMaterils from "./add-materils";
import DatatableMaterials from "@/app/(dashboard)/request/add_material/datatable-materials";
import {Divider} from "antd";

const Page = () => {

    return (
        <div>
            <Breadcrumb
                pages={[{label: "خانه", path: "/"}]}
                currentPage="لیست مواد اولیه"
                titleIcon={<BeakerIcon className="w-8"/>}
                backLink="/request"
            />
            <Card>
                <AddMaterils/>
                <Divider/>
                <DatatableMaterials/>
            </Card>
        </div>
    );
};

export default Page;
