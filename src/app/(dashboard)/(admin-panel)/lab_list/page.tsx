"use client";

import React, { useState } from "react";
import { useLabGetPage } from "@/hooks/lab/use-lab-get-page";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";
import { Collapse } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { BeakerIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const dataPage = useLabGetPage();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<BeakerIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست آزمایشگاه"}
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
