import useSetLocation from "@/hooks/map/use-set-location";
import { Col, Modal, Row } from "antd";
import { notification } from "antd/lib";
import React, { useEffect } from "react";
import useGetPostMessage from "../hook/use-get-post-message";

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

  const setLocationHandle = async (event: any) => {
    // console.log(event, selectedLabUid);

    if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
      // console.log(selectedLabUid);

      const data = JSON.parse(event.data);
      if (selectedLabUid) {
        //   console.log(selectedLabUid);

        await setLocation.mutateAsync({
          uid: selectedLabUid,
          address_Lat: data.latitude,
          address_Long: data.longitude,
          type: 1,
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", setLocationHandle);
    return () => {
      window.removeEventListener("message", setLocationHandle);
    };
  }, []);

  const handleCancelGPS = () => {
    setIsGPSModalVisibleset(false);
    setSelectedLabUid(null);
  };
  // console.log(selectedLabUid);

  return (
    <>
      <Modal
        title={"تعیین موقعیت واحد تولیدی" + selectedLabUid}
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
