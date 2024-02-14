import React, { useState } from "react";
import { Card } from "@/components/card";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import StatusColumn from "@/components/custom-table/StatusColumn";
import { Button, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { TestItemApi } from "constance/test-item";
import { z } from "zod";
import EditModal from "./edit-modal";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useTestItemDelete from "@/hooks/basic/test_item/use-test-item-delete";

const apiData = TestItemApi.BasicTestItemGetPage;
interface TProps {
  data: z.infer<typeof apiData.response.shape.data> | undefined;
  isLoading: boolean;
  setModalVisible: (arg: boolean) => void;
  setPaginate: (arg: any) => void;
}

export default function DataTable({
  setModalVisible,
  data,
  isLoading,
  setPaginate,
}: TProps) {
  const [uid, setGetUid] = useState<string | boolean>();
  const [uidDelete, setUidDelete] = useState<string | boolean>();

  const Delete = useTestItemDelete();

  const handelDelete = async () => {
    const res = await Delete.mutateAsync({ uid: uidDelete as string });

    if (res.success) {
      setUidDelete(undefined);
    }
  };

  const columns: ColumnsType<
    z.infer<typeof TestItemApi.BasicTestItemGetPage.item>
  > = [
      {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
        width: "5%",
      },
      {
        title: "نام فاکتور آزمون",
        dataIndex: "name",
        key: "2",
      },
      {
        title: "واحد اندازه گیری",
        dataIndex: "measureName",
        key: "3",
      },
      {
        title: "فعال/غیر فعال ",
        dataIndex: "isActive",
        key: "4",
        render: (e, record) => <StatusColumn record={record} />,
      },
      {
        title: "مدت زمان انجام آزمایش",
        dataIndex: "testDuration",
        key: "5",
        render: (_, record) => {
          return (
            <Typography.Text>
              {record.testDuration !== (undefined || null)
                ? `${record.testDuration} ساعت`
                : "تعریف نشده"}
            </Typography.Text>
          );
        },
      },
      {
        title: "عملیات",
        key: "عملیات",
        align: "center",
        fixed: "right",
        width: "10%",
        render: (_, record) => (
          <Space size="small">
            <Button
              type="link"
              className="text-secondary-500 font-bold"
              onClick={() => setGetUid(record.uid)}
            >
              ویرایش
            </Button>
            <Button
              type="link"
              className={"text-red-500 font-bold"}
              onClick={() => setUidDelete(record.uid)}
            >
              حذف
            </Button>
          </Space>
        ),
      },
    ];

  return (
    <>
      <Card className="mt-8">
        <CustomTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست فاکتور های آزمون",
            actions: [
              <Button
                key={"1"}
                className="flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setModalVisible(true);
                }}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن فاکتور آزمون</span>
              </Button>,
            ],
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={data}
          columns={columns}
        />
      </Card>
      <EditModal editModalUid={uid} setEditModalUid={setGetUid} />
      <ConfirmDeleteModal
        title="فاکتور آزمون"
        open={uidDelete}
        setOpen={setUidDelete}
        handleDelete={handelDelete}
        loading={Delete.isPending}
      />
    </>
  );
}
