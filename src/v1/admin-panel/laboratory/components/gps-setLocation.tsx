import { Button, Col, Modal, Row } from "antd";
import React from "react";

export default function SetLocation({
  selectedLabUid,
  setSelectedLabUid,
  isGPSModalVisibleset,
  setIsGPSModalVisibleset,
}: {
  selectedLabUid: any;
  setSelectedLabUid: any;
  isGPSModalVisibleset: any;
  setIsGPSModalVisibleset: any;
}) {
  const handleCancelGPS = () => {
    setIsGPSModalVisibleset(false);
    setSelectedLabUid(null);
    window.location.reload();
  };

  return (
    <>
      <Modal
        title="تعیین موقعیت آزمایشگاه"
        open={isGPSModalVisibleset}
        onCancel={handleCancelGPS}
        width={800}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <iframe
              src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/oil/setLabLocation?labId=${selectedLabUid}`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
