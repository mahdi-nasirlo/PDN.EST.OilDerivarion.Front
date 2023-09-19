"use client";

import React, { useState } from "react";
import PrimaryInvationListForm from "./components/primary-invation-list-form";
import PrimaryInvationListTable from "./components/primary-invation-list-table";
import PrimaryInvationListModal from "./components/primary-invation-list-modal";

export default function Page() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <PrimaryInvationListForm />
      <PrimaryInvationListTable setModalVisible={setModalVisible} />
      <PrimaryInvationListModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
}
