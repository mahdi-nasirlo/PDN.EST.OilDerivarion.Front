"use client";

import React, { useState } from "react";
import { useProductGetPage } from "@/hooks/basic/product/use-product-get-page";
import Breadcrumb from "@/components/breadcrumb";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import DataTable from "../components/data-table";
import DataList from "./[uid]/components/data-list";

export default function Page() {
  return (
    <>
      <Breadcrumb
        titleIcon={<ArchiveBoxIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست باکس ها"}
      />
      {/* <Form form={form} onFinish={handleSet} layout="vertical">
                  Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            // rules={[rules]}
            name="name"
            label="تاریخ شروع آزمایش"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="isActive"
            label="تاریخ پایان آزمایش"
            //   rules={[rules]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
                  </Form> */}
      <DataList />
    </>
  );
}
