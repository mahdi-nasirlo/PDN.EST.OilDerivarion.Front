"use client";

import { Button, Divider, Typography } from "antd";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import CreateModal from "./components/create-modal";
import DataTable from "./components/data-table";

export default function Page() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const {
    data: EmployeeMember,
    isLoading: ldEmployeeMember,
    mutate,
    isValidating,
  } = useSWR(["/ProducerUser/GetAllEmployee"], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, { arg: { fromRecord: 0, selectRecord: 10000 } }));

  const showModal = () => {
    setIsEditModalVisible(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title level={5} className="text-gray-901 text-right">
          اطلاعات پرسنلی
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
        MainMember={addIndexToData(EmployeeMember)}
        ldMainMember={ldEmployeeMember || isValidating}
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
