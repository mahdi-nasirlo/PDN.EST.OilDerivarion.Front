import useSetLocation from "@/hooks/map/use-set-location";
import { Col, Modal, Row, Spin } from "antd";
import { useEffect } from "react";
interface Props {
  selectedLabUid: any;
  setSelectedLabUid: any;
  isGPSModalVisibleset: any;
  setIsGPSModalVisibleset: any;
}

export default function SetLocation({
  selectedLabUid,
  setSelectedLabUid,
  isGPSModalVisibleset,
  setIsGPSModalVisibleset,
}: Props) {

  const handleCancelGPS = () => {
    setIsGPSModalVisibleset(false);
    setSelectedLabUid(null);
  };

  const setLocation = useSetLocation();

  useEffect(() => {
    const handleMessage = async (event: any) => {
      if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
        const data = JSON.parse(event.data);

        if (selectedLabUid) {
          await setLocation.mutateAsync({
            uid: selectedLabUid,
            address_Lat: data.latitude,
            address_Long: data.longitude,
            type: 2,
          });
          if (setLocation.isSuccess || !setLocation.isError) {
            setIsGPSModalVisibleset(false);
            setSelectedLabUid(undefined);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [selectedLabUid, setLocation, isGPSModalVisibleset]);

  return (
    <Modal
      title={"تعیین موقعیت آزمایشگاه"}
      open={isGPSModalVisibleset}
      onCancel={handleCancelGPS}
      width={800}
      footer={null}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Spin spinning={setLocation.isPending}>
            <iframe
              // src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/oil/setLabLocation?labId=${selectedLabUid}`}
              src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/getpointfrommap`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid border-2 border-CustomizeBlue-500 rounded-lg"
            >

            </iframe>
          </Spin>
        </Col>
      </Row>
    </Modal>
  );
}
