"use client";
import { Button, Col, Modal, Row, Typography } from "antd";
import React, { useState } from "react";

export default function CheckInfoModal({
  setModalVisible,
  modalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const CloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">درحال بررسی...</div>
          <div className="font-normal text-sm">
            لطفا متن زیر را با دقت مطالعه کنید
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={CloseModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={24}>
            <Button
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={CloseModal}
              key={"cancel"}
            >
              متوجه شدم
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Typography className="font-bold">
        در خواست شما ارسال شده و درحال بررسی می باشد
      </Typography>
    </Modal>
  );
}
