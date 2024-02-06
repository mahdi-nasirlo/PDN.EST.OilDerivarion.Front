"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { BeakerIcon } from "@heroicons/react/24/solid";

import { useBasicMaterialProductGetPage } from "@/hooks/material/use-basic-product-material-get-page";

const Page = () => {
  const dataPage = useBasicMaterialProductGetPage();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<BeakerIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست مواد اولیه"}
      />
      {/* <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جستجو ",
            children: <FilterForm onFinish={dataPage.setFilter as any} />,
          },
        ]}
      /> */}
      {/* <DataTable
        data={dataPage.data}
        isLoading={dataPage.isFetching || dataPage.isLoading}
        setModalVisible={setModalVisible}
        setPaginate={dataPage.setFilter}
      />
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
    </>
  );
};

export default Page;
