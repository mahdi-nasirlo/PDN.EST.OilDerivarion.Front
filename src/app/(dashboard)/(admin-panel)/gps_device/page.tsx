"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { BeakerIcon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
// import { useBasicMaterialProductGetPage } from "@/hooks/material/use-basic-product-material-get-page";
import { useBoxGPSGetPage } from "@/hooks/box-gps/use-box-gps-get-page";
import FilterForm from "./components/filter-form";

const Page = () => {
  const dataPage = useBoxGPSGetPage();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<BeakerIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"باکس های من "}
      />
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جستجو ",
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
