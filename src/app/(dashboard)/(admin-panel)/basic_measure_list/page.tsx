"use client";

import { Collapse } from "antd";
import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";
import useMeasureGet from "./components/hook/use-measure-get";
import CreateModal from "./components/measure-create-action";

export default function Page() {
  const { list } = useMeasureGet();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      {/* <Breadcrumb
        titleIcon={<Squares2X2Icon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }, { label: "محصول" }]}
        currentPage={"لیست دسته بندی ها"}
      />
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
            children: <FilterForm onFinish={dataPage.setFilter} />,
          },
        ]}
      /> */}
      <DataTable
        modalVisible={modalVisible}
        data={list.data}
        isLoading={list.isLoading}
        setModalVisible={setModalVisible}
      />
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
