import React, {useState} from 'react';
import {z} from "zod";
import {ColumnsType} from "antd/es/table";
import {ListBulletIcon} from "@heroicons/react/24/solid";
import CustomHeader from "@/components/custom-header";
import {Table} from "antd/lib";
import {addIndexToData} from "@/utils/addIndexToData";
import {Button, Tooltip, Typography} from "antd";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useRequestPackageMaterialDelete from "@/hooks/material/use-request-package-material-delete";
import useRequestPackageMaterialList from "@/hooks/material/use-request-package-material-list";

const DatatableMaterials = ({package_uid}: { package_uid?: string }) => {

    const [open, setOpen] = useState<string | undefined | boolean>()

    const materials = useRequestPackageMaterialList({package_UID: package_uid})

    const deleteMaterial = useRequestPackageMaterialDelete()

    const columns: ColumnsType<z.infer<typeof materials.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row"
        },
        {
            title: "نام ماده اولیه",
            dataIndex: "Material_Name"
        },
        {
            title: "میزان مصرف کل برای یک واحد",
            dataIndex: "Material_Unit_Consumption",
            render: (_, record) => {
                if (!record.Material_Unit_Consumption) {
                    return <Typography>_</Typography>;
                }
                return (
                    <Tooltip
                        placement="top"
                        title={<Typography>{record.Material_Unit_Consumption}</Typography>}
                    >
                        <Typography.Text
                            className="max-w-[220px]"
                            ellipsis={true}
                            style={{ width: "40px !important" }}
                        >
                            {record.Material_Unit_Consumption}
                        </Typography.Text>
                    </Tooltip>
                );
            },
        },
        {
            title: "نام تامین کننده",
            dataIndex: "Material_Supply_Name",
            render: (_, record) => {
                if (!record.Material_Supply_Name) {
                    return <Typography>_</Typography>;
                }
                return (
                    <Tooltip
                        placement="top"
                        title={<Typography>{record.Material_Supply_Name}</Typography>}
                    >
                        <Typography.Text
                            className="max-w-[220px]"
                            ellipsis={true}
                            style={{ width: "40px !important" }}
                        >
                            {record.Material_Supply_Name}
                        </Typography.Text>
                    </Tooltip>
                );
            },
        },
        {
            title: "عملیات",
            render: (value, record) => (<>
                <Button
                    type="link"
                    className={"text-red-500 font-bold"}
                    onClick={() => setOpen(record.Uid)}
                >
                    حذف
                </Button>
            </>)
        }
    ]

    return (
        <div>
            <CustomHeader text={"لیست مواد اولیه"} icon={<ListBulletIcon />} />
            <Table
                columns={columns}
                dataSource={addIndexToData(materials.data)}
                pagination={{ showSizeChanger: false }}
                loading={materials.isFetching || materials.isLoading}
            />
            <ConfirmDeleteModal
                open={typeof open === "string"}
                setOpen={setOpen}
                loading={deleteMaterial.isPending}
                handleDelete={async () => {

                    const res = await deleteMaterial.mutateAsync({
                        material_Uid: open as string,
                        request__Package_UID: package_uid
                    })

                    if (res.success)
                        setOpen(undefined)

                }}
                title={"ماده اولیه"}
            />
        </div>
    );
};

export default DatatableMaterials;