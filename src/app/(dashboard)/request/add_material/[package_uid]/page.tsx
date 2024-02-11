"use client";

import React from "react";
import {Card} from "@/components/card";
import {BeakerIcon} from "@heroicons/react/24/outline";
import Breadcrumb from "@/components/breadcrumb";
import {Divider} from "antd";
import AddMaterials from "@/app/(dashboard)/request/add_material/components/add-materials";
import DatatableMaterials from "@/app/(dashboard)/request/add_material/components/datatable-materials";


const Page = ({params: {package_uid}}: { params: { package_uid: string } }) => {

    return (
        <div>
            <Breadcrumb
                pages={[{label: "خانه", path: "/"}]}
                currentPage="لیست مواد اولیه"
                titleIcon={<BeakerIcon className="w-8"/>}
                backLink="/request"
            />
            <Card>
                <AddMaterials package_uid={package_uid}/>
                <Divider/>
                <DatatableMaterials package_uid={package_uid}/>
            </Card>
        </div>
    );
};

export default Page;
