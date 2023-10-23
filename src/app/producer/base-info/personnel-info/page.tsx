"use client";

import { Button, Divider, Typography } from "antd";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SetEmployeeMember } from "../../../../../interfaces/Base-info";
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
  } = useSWR<{
    records: SetEmployeeMember[];
    count: number;
  }>(["/Producer/GetPageEmployee"], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, {
      arg: {
        fromRecord: 0,
        selectRecord: 10000,
      },
    })
  );

  const showModal = () => {
    setIsEditModalVisible(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
          اطلاعات پرسنلی
        </Typography>
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
        isValidating={isValidating}
        mutate={mutate}
        MainMember={addIndexToData(EmployeeMember?.records)}
        ldMainMember={ldEmployeeMember}
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
