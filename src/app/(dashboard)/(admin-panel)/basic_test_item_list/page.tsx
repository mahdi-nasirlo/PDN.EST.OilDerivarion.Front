"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { Collapse } from "antd";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import { useTestItemGetPage } from "@/hooks/basic/test_item/use-test-item-get-page";

export default function Page() {

  const dataPage = useTestItemGetPage();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<DocumentCheckIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"فاکتور های آزمون"}
      />
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
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
