"use client";

import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Card } from "@/components/card";

import StatusColumn from "@/components/custom-table/StatusColumn";

export default function DataTable() {
  const columns = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "بارکد",
      dataIndex: "code",
      key: "2",
    },
    ,
    {
      title: "فعال/غیر فعال ",
      dataIndex: "is_Active",
      key: "3",
      // render: () => <StatusColumn record={record} />,
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      // render: (_, record) => (
      //   <Space size="small">
      //     <Button
      //       type="link"
      //       className="text-primary-500 font-bold"
      //       // loading={openBox.isMutating}
      //       onClick={() => openBox.trigger()}
      //     >
      //       بازکردن درب دستگاه
      //     </Button>
      //      <Button
      //       type="link"
      //       className="text-secondary-500 font-bold"
      //       onClick={() => setGetUid(record.uid)}
      //     >
      //       مشاهده
      //     </Button>

      //   </Space>
      // ),
    },
  ];
  return (
    <>
      <Card className="mt-8">
        {/* <CustomTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست باگس های من",
            actions: [
              <Button
                key={"1"}
                className="max-md:w-full flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => setModalVisible(true)}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن باکس</span>
              </Button>,
            ],
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={{ records: data }}
          columns={columns}
        /> */}
      </Card>
    </>
  );
}
