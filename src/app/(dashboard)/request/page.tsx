"use client";

import { Button, Col, Divider, Row, Spin, Typography } from "antd";
import React from "react";
// import CardGrid from "./components/card-grid";
import { useRouter } from "next/navigation";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { PlusSmallIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useGetRequestPackagePartList } from "@/hooks/material/use-get-request-package-part-list";
import CardList from "@/app/(dashboard)/request/components/card-list";
import FirstCard from "@/app/(dashboard)/request/components/first-card";
import Link from "next/link";
import { Alert } from "antd/lib";

export default function Page() {
  const packagePart = useGetRequestPackagePartList();

  const router = useRouter();

  return (
    <>
      <Breadcrumb
        pages={[{ label: "خانه", path: "/" }]}
        actions={[
          <Link key={"1"} href={"/request/add_material"}>
            <Button
              key="1"
              className="flex items-center"
              icon={<PlusSmallIcon className="w-5 h-5" />}
              type="primary"
              size="large"
            >
              افزودن مواد اولیه
            </Button>
          </Link>,
        ]}
        currentPage="پکیج درخواست"
        titleIcon={<SquaresPlusIcon className="w-8" />}
      />
      <Card>
        <Alert
          message={
            <Typography>
              لطفا قبل از افزودن پکیج مورد نظر از طریق&nbsp;
              <strong>افزودن مواد اولیه</strong> اقدام به ثبت مواد اولیه مورد
              نیاز خود نمایید
            </Typography>
          }
          //   description=""
          type="warning"
          className="mb-3"
        />
        <Spin spinning={packagePart.isFetching}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12} xl={8} xxl={6}>
              <FirstCard />
            </Col>
            <CardList data={packagePart?.data} />
          </Row>
        </Spin>
        <Divider />
        <Row gutter={[12, 12]}>
          <Col className="flex" xs={24} sm={12}>
            <Button
              size="large"
              className="w-full"
              type="default"
              onClick={() => router.push("/request/list")}
            >
              بازگشت
            </Button>
          </Col>
          <Col className="flex" xs={24} sm={12}>
            <Button
              size="large"
              className="w-full"
              type="primary"
              onClick={() => router.push("/request/final-review")}
            >
              بازبینی نهایی
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
