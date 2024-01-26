"use client"

import { Button, Col, Divider, Row } from "antd";
import React from "react";
import { Card } from "@/components/card";
import CardGrid from "./card-grid";

const Page = () => {

    return (
        <div>
            <Card>
                <Row gutter={[24, 24]}>
                    <CardGrid />
                </Row>
                <Divider />
                <Row gutter={[12, 12]}>
                    <Col xs={24} md={24}>
                        <Button size="large" className="w-full" type="primary">
                            بازبینی نهایی
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Page;