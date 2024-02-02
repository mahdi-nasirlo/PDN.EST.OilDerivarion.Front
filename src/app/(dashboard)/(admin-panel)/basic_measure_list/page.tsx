"use client";

import { Collapse } from "antd";
import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { Squares2X2Icon, SwatchIcon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";
import useMeasureGet from "./components/hook/use-measure-get";
import CreateModal from "./components/measure-create-action";
import FilterForm from "./components/filter-form";

export default function Page() {
  const { list } = useMeasureGet();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<SwatchIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }, { label: "واحد اندازه گیری" }]}
        currentPage={"لیست واحد اندازه گیری"}
      />
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
            children: <FilterForm onFinish={list.setFilter as any} />,
          },
        ]}
      />
      <DataTable
        modalVisible={modalVisible}
        data={list.data?.records}
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
