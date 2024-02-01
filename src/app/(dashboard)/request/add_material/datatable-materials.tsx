import React from 'react';
import CustomTable from "@/components/custom-table";
import {materialApi} from "../../../../constance/material";
import {z} from "zod";
import {ColumnsType} from "antd/es/table";
import {ListBulletIcon} from "@heroicons/react/24/solid";
import {
    useGetAllRequestPackageRegisteredMaterial
} from "@/hooks/material/use-get-all-request-package-registered-material";

const DatatableMaterials = () => {

    const materials = useGetAllRequestPackageRegisteredMaterial()

    const columns: ColumnsType<z.infer<typeof materialApi.RequestPackageMaterialAdd.item>> = [
        {title: "test"}
    ]

    return (
        <div>
            <CustomTable
                columns={columns}
                header={{
                    text: "لیست مواد اولیه",
                    icon: <ListBulletIcon/>
                }}
                setInitialData={() => {
                }}
                isLoading={false}
                data={materials.data}
            />
        </div>
    );
};

export default DatatableMaterials;