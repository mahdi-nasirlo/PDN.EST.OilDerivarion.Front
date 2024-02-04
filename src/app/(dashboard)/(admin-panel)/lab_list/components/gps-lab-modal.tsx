import { Button, Col, Modal, Row } from "antd";
import React from "react";

export default function GpsLabModal({
  selectedLabUid,
  setSelectedLabUid,
  isGPSModalVisible,
  setIsGPSModalVisible,
}: {
  selectedLabUid: any;
  setSelectedLabUid: any;
  isGPSModalVisible: any;
  setIsGPSModalVisible: any;
}) {
  const handleCancelGPS = () => {
    setIsGPSModalVisible(false);
    setSelectedLabUid(null);
  };

  return (
    <>
      <Modal
        title="مشاهده موقعیت"
        open={isGPSModalVisible}
        onCancel={handleCancelGPS}
        width={800}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={24}>
              <Button
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleCancelGPS}
                key={"cancel"}
              >
                برگشت
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <iframe
              src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/oil/lab?labId=${selectedLabUid}`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
