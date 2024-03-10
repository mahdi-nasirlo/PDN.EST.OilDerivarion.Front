import useGetLocation from "@/hooks/map/use-get-location";
import useSetLocation from "@/hooks/map/use-set-location";
import { Button, Col, Modal, Row, notification } from "antd";
import mapApi from "constance/map";
import React from "react";
import { z } from "zod";
const apiData = mapApi.SetLocation.type;
const ResposeGet = mapApi.GetLocation.Item;
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
  console.log();

  const setLocation = useSetLocation();
  //   const getLocation = useGetLocation(selectedLabUid, 1);
  const handleCancelGPS = () => {
    setIsGPSModalVisibleset(false);
    setSelectedLabUid(null);
    window.location.reload();
  };

  window.addEventListener(
    "message",
    (event) => {
      console.log("test");

      // Do we trust the sender of this message?  (might be
      // different from what we originally opened, for example).
      if (event.origin !== "http://example.com") return;

      // event.source is popup
      // event.data is "hi there yourself!  the secret response is: rheeeeet!"
    },
    false
  );

  window.addEventListener("message", (event) => {
    console.log(event.data);
    // if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
    //   console.log(event, "load");

    //   try {
    //     // console.log(event.data);
    //     const data = JSON.parse(event.data);
    //     setLocation.mutateAsync({
    //       uid: selectedLabUid,
    //       address_Lat: data.latitude,
    //       address_Long: data.longitude,
    //       type: 1,
    //     });
    //   } catch (error) {
    //     console.log(error);

    //     notification.error({
    //       message: "خطایی رخ داده است لطفا با پشتیبان تماس بگیرید",
    //     });
    //   }
    // }
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
