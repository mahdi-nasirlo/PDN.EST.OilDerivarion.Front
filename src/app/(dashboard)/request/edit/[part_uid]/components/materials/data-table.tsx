import React from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Col, Space, Typography} from "antd";
import {ViewColumnsIcon} from "@heroicons/react/24/outline";
import CustomTable from "@/components/custom-table";
import {PlusOutlined} from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import {z} from "zod";
import useUiRequestMaterialList from "@/app/(dashboard)/request/edit/[part_uid]/hook/use-ui-request-material-list";

export default function DataTable({
  setVisibleModal,
  partUid,
  package_uid,
}: {
  setVisibleModal: (arg: any) => void;
  partUid: string;
  package_uid?: string;
}) {
  const {
    deleteMaterial,
    deleteModal,
    setDeleteModal,
    setEditModal,
    editModal,
    materials,
    onDelete,
  } = useUiRequestMaterialList({ uid: partUid, package_uid });

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
      render: (value, record) => `${value}%`,
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
          icon: <ViewColumnsIcon />,
            text: " لیست مواد اولیه",
            discretion: <Typography className={"text-gray-500 font-normal"}> ( مجموع درصد استفاده باید100 باشد
              ) </Typography>,
            actions: (
                <Col xs={24} xxl={3} md={6} sm={8}>
                  <Button
                      className="flex items-center justify-center w-full"
                      icon={<PlusOutlined width={16} height={16}/>}
                      type="primary"
                      size="large"
                      onClick={() => setVisibleModal(true)}
                  >
                    افزودن مواد اولیه
                  </Button>
                </Col>
            ),
        }}
        isLoading={materials.isFetching}
        pagination={false}
        data={{ records: materials.data }}
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
