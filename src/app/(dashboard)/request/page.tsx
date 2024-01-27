"use client"

import { Button, Col, Divider, Row } from "antd";
import React from "react";
import { Card } from "@/components/card";
import CardGrid from "./card-grid";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/components/breadcrumb";
import { useRouter } from "next/navigation";

const Page = () => {

    const router = useRouter();

    const HandelSubmit = () => router.push('/request/final-review');

    return (
        <div>
            <Breadcrumb
                pages={[{ label: "خانه", path: "/" }]}
                currentPage="پکیج درخواستی"
                titleIcon={<SquaresPlusIcon />}
            />
            <Card>
                <Row gutter={[24, 24]}>
                    <CardGrid />
                </Row>
                <Divider />
                <Row gutter={[12, 12]}>
                    <Col xs={24} md={24}>
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
        </div>
    );
};

export default Page;