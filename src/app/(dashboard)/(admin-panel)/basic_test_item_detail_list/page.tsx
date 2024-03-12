"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Collapse } from "antd";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import { useTestItemDetailGetPage } from "@/hooks/basic/test-item-detail/use-test-item-detail-get-page";

export default function Page() {
  const dataPage = useTestItemDetailGetPage();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentMagnifyingGlassIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"استانداردهای آزمون"}
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
        isLoading={dataPage.isLoading || dataPage.isFetching}
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
