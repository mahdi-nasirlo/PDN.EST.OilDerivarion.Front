import useSetLocation from "@/hooks/map/use-set-location";
import { Col, Modal, Row } from "antd";
import { Spin, Typography, notification } from "antd/lib";
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
  const setLocation = useSetLocation();
  const handleCancelGPS = () => {
    setIsGPSModalVisibleset(false);
    setSelectedLabUid(null);
    // window.location.reload();
  };
  // console.log(selectedLabUid);
  // // useEffect(() =>
  // window.addEventListener(
  //   "message",
  //   async (event) => {
  //     if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
  //       // try {

  //       const data = JSON.parse(event.data);

  //       if (selectedLabUid) {
  //         await setLocation.mutateAsync({
  //           uid: selectedLabUid,
  //           address_Lat: data.latitude,
  //           address_Long: data.longitude,
  //           type: 1,
  //         });
  //       }

  //       // } catch (error) {
  //       //   notification.error({
  //       //     message: "خطایی رخ داده است لطفا با پشتیبان تماس بگیرید",
  //       //   });
  //       // }
  //     }
  //   },
  //   false
  // );
  // }, []);
  useEffect(() => {
    const handleMessage = async (event: any) => {
      if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
        const data = JSON.parse(event.data);

        if (selectedLabUid) {
          await setLocation.mutateAsync({
            uid: selectedLabUid,
            address_Lat: data.latitude,
            address_Long: data.longitude,
            type: 1,
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [selectedLabUid, setLocation]);

  return (
    <>
      <Modal
        title={"تعیین موقعیت واحد تولیدی"}
        open={isGPSModalVisibleset}
        onCancel={handleCancelGPS}
        width={800}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <iframe
              style={{ overflow: "hidden" }}
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
