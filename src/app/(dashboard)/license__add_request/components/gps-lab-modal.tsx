import React from "react";
import { Button, Col, Modal, Row } from "antd";

interface TProps {
  lat: string | number | undefined;
  long: string | number | undefined;
  setLong: (arg: any) => void;
}

export default function GpsProducerModal({ lat, long, setLong }: TProps) {
  return (
    <>
      <Modal
        title="مشاهده موقعیت"
        open={typeof long !== "undefined"}
        onCancel={() => setLong(undefined)}
        width={800}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={24}>
              <Button
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={() => setLong(undefined)}
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
              style={{ overflowX: "hidden" }}
              src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/ShowPointOnMap?zoom=14&title=موقعیت واحد تولیدی&latitude=${lat}&longitude=${long}&show_ballon=0&balloon_content=محل دقیق واحد تولیدی`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid border-2 border-CustomizeBlue-500 rounded-lg"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
