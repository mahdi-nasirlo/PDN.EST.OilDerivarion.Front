"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";

export default function Page() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<ClipboardDocumentCheckIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست اطلاعات مدیریتی تولید کننده"}
      />
      <DataTable
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
