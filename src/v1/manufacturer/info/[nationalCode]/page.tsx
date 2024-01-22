"use client";

import { Button, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import RejectRequestModal from "./components/reject-request-modal";
import GetProducerForm from "./components/get-producer-form";
import CEOInfoTable from "./components/CEO-info-table";
import PersonnelInfoTable from "./components/Personnel-info-table";
import LicenseInfoTable from "./components/License-info-table";
import AddressInfoForm from "./components/Address-info-form";

export default function Page({ params }: { params: { nationalCode: string } }) {

    const [modalVisible, setModalVisible] = useState(false);


    const showModal = () => {
        setModalVisible(true);
    };


    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <GetProducerForm params={params} />
                <CEOInfoTable params={params} />
                <PersonnelInfoTable params={params} />
                <LicenseInfoTable params={params} />
                <AddressInfoForm params={params} />
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <div className="flex gap-4">
                            {/* {isLoading ? <Typography>is loading...</Typography> : data?.choices?.map((button) => (<>
                                <Button
                                    className="w-full management-info-form-submit btn-filter"
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    <span className="flex gap-2 justify-center ">{button.label}</span>
                                </Button>
                            </>))} */}
                            {/*<Button*/}
                            {/*    className="w-full management-info-form-submit btn-filter"*/}
                            {/*    size="large"*/}
                            {/*    type="primary"*/}
                            {/*    htmlType="submit"*/}
                            {/*>*/}
                            {/*    <span className="flex gap-2 justify-center "> ثبت</span>*/}
                            {/*</Button>*/}
                            {/*<Button*/}
                            {/*    className="w-full bg-gray-100 text-black"*/}
                            {/*    size="large"*/}
                            {/*    type="primary"*/}
                            {/*    onClick={showModal}*/}

                            {/*>*/}
                            {/*    <span className="flex gap-2 justify-center ">رد درخواست</span>*/}
                            {/*</Button>*/}
                        </div>
                    </Col>
                </Row>
            </div>
            <RejectRequestModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}
