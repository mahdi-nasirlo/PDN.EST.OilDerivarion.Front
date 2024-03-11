"use client";

import { Collapse } from "antd";
import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { SwatchIcon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";
import CreateModal from "./components/measure-create-action";
import FilterForm from "./components/filter-form";
import { useMeasureGetPage } from "@/hooks/basic/measure/use-measure-get-page";

export default function Page() {
  const dataPage = useMeasureGetPage();


  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<SwatchIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست واحد اندازه گیری"}
      />
      <Collapse
        size="large"
        items={[
          {
            label: "جستجو",
            children: <FilterForm onFinish={dataPage.setFilter as any} />,
          },
        ]}
      />
      <DataTable
        data={dataPage.data}
        isLoading={dataPage.isFetching || dataPage.isLoading}
        setModalVisible={setModalVisible}
        setPaginate={dataPage.setFilter}
      />
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
