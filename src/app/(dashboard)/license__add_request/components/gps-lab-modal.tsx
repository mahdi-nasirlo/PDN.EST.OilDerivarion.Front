import useGetLocation from "@/hooks/map/use-get-location";
import useSetLocation from "@/hooks/map/use-set-location";
import { Button, Col, Modal, Row } from "antd";
import { Spin, notification } from "antd/lib";
import mapApi from "constance/map";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";

const ResposeGet = mapApi.GetLocation.response.shape.data;

export default function GpsProducerModal({
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
  const setLocation = useSetLocation();
  const getLocation = useGetLocation(selectedLabUid, 1);
  const handleCancelGPS = () => {
    setIsGPSModalVisible(false);
    setSelectedLabUid(null);
  };

  const map: z.infer<typeof ResposeGet> | undefined = getLocation.data;

  // window.addEventListener("message", (event) => {
  //   if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
  //     try {
  //       console.log(event.data);

  //       console.log(JSON.parse(event.data));
  //       const data: z.infer<typeof ResposeGet> = JSON.parse(event.data);
  //       setLocation.mutateAsync({
  //         uid: selectedLabUid,
  //         address_Lat: data.latitude,
  //         address_Long: data.longitude,
  //         type: 1,
  //       });
  //     } catch (error) {
  //       console.log(error);

  //       notification.error({
  //         message: "خطایی رخ داده است لطفا با پشتیبان تماس بگیرید",
  //       });
  //     }
  //   }
  // });
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
            {getLocation.isFetching ? (
              <Spin className="flex justify-center" />
            ) : (
              <iframe
                src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/ShowPointOnMap?title=موقعیت واحد تولیدی&latitude=${map?.address_Lat}&longitude=${map?.address_Long}&show_ballon=0&balloon_content=محل دقیق واحد تولیدی`}
                aria-hidden="false"
                className="w-full h-[480px] border-solid"
              ></iframe>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
}
