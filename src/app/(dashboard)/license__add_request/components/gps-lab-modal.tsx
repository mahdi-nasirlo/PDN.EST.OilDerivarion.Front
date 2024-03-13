import useGetLocation from "@/hooks/map/use-get-location";
import useSetLocation from "@/hooks/map/use-set-location";
import { Button, Col, Modal, Row } from "antd";
import { Spin, notification } from "antd/lib";
import mapApi from "constance/map";
import { lang } from "jalali-moment";
import React, { useEffect, useRef, useState } from "react";
import { late, z } from "zod";

export default function GpsProducerModal({
  lat,
  long,
  setLong,
}: {
  lat: string | number | undefined;
  long: string | number | undefined;
  setLong: (arg: any) => void;
}) {
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
              src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/ShowPointOnMap?zoom=2&title=موقعیت واحد تولیدی&latitude=${lat}&longitude=${long}&show_ballon=0&balloon_content=محل دقیق واحد تولیدی`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
