import useSetLocation from "@/hooks/map/use-set-location";
import { Button, Col, Modal, Row, notification } from "antd";
import React, { useEffect } from "react";

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

  // useEffect(() => {
  window.addEventListener(
    "message",
    async (event) => {
      console.log(event);

      if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
        // try {
        console.log("test", event);

        const data = JSON.parse(event.data);

        if (selectedLabUid == true) {
          await setLocation.mutateAsync({
            uid: selectedLabUid,
            address_Lat: data.latitude,
            address_Long: data.longitude,
            type: 2,
          });
        }

        // } catch (error) {
        //   notification.error({
        //     message: "خطایی رخ داده است لطفا با پشتیبان تماس بگیرید",
        //   });
        // }
      }
    },
    false
  );
  // }, []);

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
