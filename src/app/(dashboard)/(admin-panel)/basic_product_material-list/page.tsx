"use client";
import { Card } from "@/components/card";
import React, { useState } from "react";
import DataTable from "./components/data-table";
import CreateModal from "./components/material-action";

const Page = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* <Collapse
                size="large"
                items={[
                    {
                        label: "فیلتر جستجو ",
                        children: (
                            <FilterForm
                                unsetFilter={unsetFilter}
                                filter={setFilterTable}
                                isLoading={ldMaterial}
                            />
                        ),
                    },
                ]}
            /> */}
      <DataTable setModalVisible={setModalVisible} />
      <CreateModal
        // mutate={mutate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Page;
