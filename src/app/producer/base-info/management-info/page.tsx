"use client";

import { Button, Divider, Typography } from "antd";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { addIndexToData } from "../../../../../lib/addIndexToData";

export default function Home() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showModal = () => {
    setIsEditModalVisible(true);
  };

  const {
    data: MainMember,
    isLoading: ldMainMember,
    mutate,
    isValidating,
  } = useSWR(["/ProducerUser/GetAllMainMember"], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, { arg: { fromRecord: 0, selectRecord: 10000 } }));

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title level={5} className="text-gray-901 text-right">
          اطلاعات مدیریتی
        </Typography.Title>
        <Button
          className="max-md:w-full flex justify-center items-center gap-2"
          size="large"
          type="primary"
          htmlType="submit"
          onClick={showModal}
        >
          <PlusIcon width={24} height={24} />
          <span className="flex">افزودن</span>
        </Button>
      </div>
      <Divider />
      <DataTable
        mutate={mutate}
        MainMember={addIndexToData(MainMember)}
        ldMainMember={ldMainMember || isValidating}
      />
      <CreateModal
        mutate={mutate}
        // data={data}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
      />
    </>
  );
}
