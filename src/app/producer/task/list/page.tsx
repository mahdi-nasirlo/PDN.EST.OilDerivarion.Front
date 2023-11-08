"use client";

import React, {useState} from "react";
import DataTable from "./components/data-table";

export default function Home() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showModal = () => {
    setIsEditModalVisible(true);
  };

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <DataTable
        />
      </div>
    </>
  );
}
