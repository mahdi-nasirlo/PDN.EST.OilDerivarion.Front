import useSetLocation from "@/hooks/map/use-set-location";
import { Button, Col, Modal, Row, notification } from "antd";
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
  const setLocation = useSetLocation();
  console.log(selectedLabUid);

  window.addEventListener("message", async (event) => {
    if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
      const data = JSON.parse(event.data);
      console.log(selectedLabUid);
      if (selectedLabUid) {
        await setLocation.mutateAsync({
          uid: selectedLabUid,
          address_Lat: data.latitude,
          address_Long: data.longitude,
          type: 2,
        });
      }
    }
  });

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
              // src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/oil/setLabLocation?labId=${selectedLabUid}`}
              src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/getpointfrommap`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
