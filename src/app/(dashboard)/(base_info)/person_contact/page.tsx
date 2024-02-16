"use client";

import React, { useState } from "react";
import { useProductGetPage } from "@/hooks/basic/product/use-product-get-page";
import Breadcrumb from "@/components/breadcrumb";
import {
  ArchiveBoxIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import DisplayForm from "./components/display-form";
import { Card } from "@/components/card";
import { Button, Typography } from "antd/lib";
import { Divider } from "antd";
import EditModal from "./components/edit-modal";

export default function Page() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Breadcrumb
        titleIcon={<PhoneIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"اطلاعات تماس"}
      />
      <Card>
        <div className="flex justify-between items-center">
          <Typography.Title level={5} className="text-gray-901 text-right">
            اطلاعات تماس
          </Typography.Title>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            // onClick={showModal}
          >
            <PencilSquareIcon width={24} height={24} />
            <span className="flex">ویرایش</span>
          </Button>
        </div>
        <Divider />
        <DisplayForm />
        <EditModal />
      </Card>
    </>
  );
}
