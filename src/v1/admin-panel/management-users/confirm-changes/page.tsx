"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جستجو ",
            children: <FilterForm />,
          },
        ]}
      />
      <DataTable setModalVisible={setModalVisible} />
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}