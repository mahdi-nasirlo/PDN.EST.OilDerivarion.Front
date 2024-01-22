"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import InvitationModal from "./components/Invitation-modal";
import VisitTimeModal from "./components/visit-time-modal";

export default function Page() {

  const [modalVisible, setModalVisible] = useState(false);
  const [VisitTimeModalVisible, setVisitTimeModalVisible] = useState(false);


  return (
    <>
      <Collapse
        size="large"
        items={[{
          label: 'فیلتر جستجو ', children: <FilterForm />
        }]}
      />
      <DataTable
        setModalVisible={setModalVisible}
        setVisitTimeModalVisible={setVisitTimeModalVisible}
      />
      <InvitationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <VisitTimeModal
        VisitTimeModalVisible={VisitTimeModalVisible}
        setVisitTimeModalVisible={setVisitTimeModalVisible}
      />
    </>
  );
}
