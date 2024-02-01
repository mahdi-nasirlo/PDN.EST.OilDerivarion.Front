"use client";

import {Button, Col, Divider, Row} from "antd";
import React from "react";
import CardGrid from "../components/card-grid";
import {useRouter} from "next/navigation";
import {Card} from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import {SquaresPlusIcon} from "@heroicons/react/24/outline";

export default function Page() {
  const router = useRouter();

  const HandelSubmit = () => router.push("/request/final-review");

  const HandelCansal = () => router.push("/request");

  return (
    <>
      <Breadcrumb
        pages={[
          { label: "خانه", path: "/" },
          { label: "لیست مواد اولیه", path: "/request" },
        ]}
        currentPage="زیر درخواست ها"
        titleIcon={<SquaresPlusIcon className="w-8" />}
      />
      <Card>
        <Row gutter={[24, 24]}>
          <CardGrid />
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full"
              type="default"
              onClick={HandelCansal}
            >
              بازگشت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full"
              type="primary"
              onClick={HandelSubmit}
            >
              بازبینی نهایی
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
