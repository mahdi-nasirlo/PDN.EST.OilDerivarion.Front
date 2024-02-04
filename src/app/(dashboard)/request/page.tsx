"use client";

import { Button, Col, Divider, Row, Spin } from "antd";
import React from "react";
// import CardGrid from "./components/card-grid";
import { useRouter } from "next/navigation";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { PlusSmallIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useGetRequestPackagePartList } from "@/hooks/material/use-get-request-package-part-list";
import CardList from "@/app/(dashboard)/request/components/card-list";
import FirstCard from "@/app/(dashboard)/request/components/first-card";

export default function Page() {

    const packagePart = useGetRequestPackagePartList()

    const router = useRouter()

    return (
        <>
            <Breadcrumb
                pages={[
                    { label: "خانه", path: "/" },
                    { label: "ثبت درخواست" },
                ]}
                actions={[
                    <Button
                        key="1"
                        className="flex items-center"
                        icon={<PlusSmallIcon className="w-5 h-5" />}
                        type="primary"
                        onClick={() => router.push("/request/add_material")}
                    >
                        مواد اولیه
                    </Button>
                ]}
                currentPage="زیر درخواست ها"
                titleIcon={<SquaresPlusIcon className="w-8" />}
            />
            <Card>
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
                    <Col className="flex" xs={24} md={12}>
                        <Button
                            size="large"
                            className="w-full"
                            type="default"
                            onClick={() => router.push("/request/list")}
                        >
                            بازگشت
                        </Button>
                    </Col>
                    <Col className="flex" xs={24} md={12}>
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
