"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { BeakerIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import useBasicMaterial from "./components/hook/use-basic-material";
import DataTable from "./components/data-table";
import CreateModal from "./components/material-action";
import FilterForm from "./components/filter-form";

const Page = () => {
  const { list } = useBasicMaterial();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<BeakerIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست مواد اولیه"}
      />
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جستجو ",
            children: <FilterForm onFinish={list.setFilter as any} />,
          },
        ]}
      />
      <DataTable
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
};

export default Page;
