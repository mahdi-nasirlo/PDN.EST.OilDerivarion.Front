"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import {PencilIcon, PlusSmallIcon} from "@heroicons/react/24/outline";
import {Button, Col, Divider, Row, Spin,} from "antd";
import {Card} from "@/components/card";
import {useRouter} from "next/navigation";
import {useGetRequestPackagePartList} from "@/hooks/material/use-get-request-package-part-list";
import Link from "next/link";
import FirstCard from "@/app/(dashboard)/request/components/first-card";
import CardList from "@/app/(dashboard)/request/components/card-list";

interface TProps {
  params: { uid: string; }
}

export default function Page({params: {uid}}: TProps) {

    const packagePart = useGetRequestPackagePartList({package_UID: uid})

    const router = useRouter()

    return (
        <>
            <Breadcrumb
                pages={[
                    {label: "خانه", path: "/"},
                    {label: "ویرایش درخواست"},
                ]}
                actions={[
                    <Link key={'1'} href={`/request/add_material/${uid}`}>
                        <Button
                            key="1"
                            className="flex items-center"
                            icon={<PlusSmallIcon className="w-5 h-5"/>}
                            type="primary"
                            size="large"
                        >
                            مواد اولیه
                        </Button>
                    </Link>
                ]}
                currentPage="ویرایش پکیج ها"
                titleIcon={<PencilIcon className="w-8"/>}
            />
            <Card>
                <Spin spinning={packagePart.isFetching}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <FirstCard package_UID={uid}/>
                        </Col>
                        <CardList data={packagePart?.data} package_UID={uid}/>
                    </Row>
                </Spin>
                <Divider/>
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
                            onClick={() => router.push(`/request/final-review${uid ? `/${uid}` : ""}`)}
                        >
                            بازبینی نهایی
                        </Button>
                    </Col>
                </Row>
            </Card>
        </>
    );
}
