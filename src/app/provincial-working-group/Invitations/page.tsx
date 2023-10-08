"use client";

import React, { useState } from "react";
import PrimaryInvationListForm from "./components/primary-invation-list-form";
import PrimaryInvationListTable from "./components/primary-invation-list-table";
import PrimaryInvationListModal from "./components/primary-invation-list-modal";
import { Collapse } from "antd";

export default function Page() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Collapse
        size="large"
        items={[{
          label: 'فیلتر جدول', children: <PrimaryInvationListForm />
        }]}
      />
      <PrimaryInvationListTable setModalVisible={setModalVisible} />
      <PrimaryInvationListModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
}
