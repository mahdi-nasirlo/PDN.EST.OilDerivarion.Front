import React from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Space} from "antd";
import {ViewColumnsIcon} from "@heroicons/react/24/outline";
import CustomTable from "@/components/custom-table";
import {PlusOutlined} from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import {z} from "zod";
import useUiRequestMaterialList from "@/app/(dashboard)/request/[uid]/materials/hook/use-ui-request-material-list";

export default function DataTable({setVisibleModal, partUid}: {
    setVisibleModal: (arg: any) => void,
    partUid: string
}) {

    const {
        deleteMaterial,
        deleteModal,
        setDeleteModal,
        setEditModal,
        editModal,
        materials,
        onDelete
    } = useUiRequestMaterialList({uid: partUid})

    const columns: ColumnsType<z.infer<typeof materials.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            width: "5%",
        },
        {
            title: "نام مواد اولیه",
            dataIndex: "material_name",
        },
        {
            title: "درصد استفاده",
            dataIndex: "Estefadeh",
            render: (value, record) => `${value}%`
        },
        {
            title: "عملیات",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (value, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => setDeleteModal(record.UID)}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <CustomTable
                header={{
                    icon: <ViewColumnsIcon/>,
                    text: "لیست مواد اولیه",
                    actions: (
                        <Button
                            className="flex items-center justify-center"
                            icon={<PlusOutlined width={16} height={16}/>}
                            type="primary"
                            size="large"
                            onClick={() => setVisibleModal(true)}
                        >
                            افزودن مواد اولیه
                        </Button>
                    ),
                }}
                isLoading={materials.isFetching}
                pagination={false}
                data={{records: materials.data}}
                columns={columns}
            />
            {/*<EditModal editModal={editModal} setEditModal={setEditModal}/>*/}
            <ConfirmDeleteModal
                title="مواد اولیه"
                open={typeof deleteModal === "string"}
                setOpen={setDeleteModal}
                loading={deleteMaterial.isPending}
                handleDelete={onDelete}
            />
        </>
    );
}



