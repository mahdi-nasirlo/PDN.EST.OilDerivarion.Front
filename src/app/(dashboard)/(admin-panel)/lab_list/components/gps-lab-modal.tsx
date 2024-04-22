import useGetLocation from "@/hooks/map/use-get-location";
import { Button, Col, Modal, Row } from "antd";
import { Spin } from "antd/lib";
import mapApi from "constance/map";
import { z } from "zod";

const ResposeGet = mapApi.GetLocation.response.shape.data;

interface Props {
  selectedLabUid: any;
  setSelectedLabUid: any;
  isGPSModalVisible: any;
  setIsGPSModalVisible: any;
}

export default function GpsLabModal({
  selectedLabUid,
  setSelectedLabUid,
  isGPSModalVisible,
  setIsGPSModalVisible,
}: Props) {
  const handleCancelGPS = () => {
    setIsGPSModalVisible(false);
    setSelectedLabUid(null);
  };

  const getLocation = useGetLocation(selectedLabUid, 2);
  const map: z.infer<typeof ResposeGet> | undefined = getLocation.data;

  return (
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
          <Spin spinning={getLocation.isFetching || getLocation.isLoading} />
          <iframe
            // src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/oil/lab?labId=${selectedLabUid}`}
            src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/ShowPointOnMap?title=${map?.name}&latitude=${map?.address_Lat}&longitude=${map?.address_Long}&show_ballon=0&balloon_content=${map?.address}`}
            aria-hidden="false"
            className="w-full h-[480px] border-solid border-2 border-CustomizeBlue-500 rounded-lg"
          ></iframe>
        </Col>
      </Row>
    </Modal>
  );
}
