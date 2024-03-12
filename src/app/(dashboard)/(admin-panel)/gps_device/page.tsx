"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import { useBoxGPSGetPage } from "@/hooks/box-gps/use-box-gps-get-page";
import FilterForm from "./components/filter-form";

const Page = () => {
  const dataPage = useBoxGPSGetPage();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<ArchiveBoxArrowDownIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست جعبه ها"}
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
};

export default Page;
