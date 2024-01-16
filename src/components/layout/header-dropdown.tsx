import Image from "next/image";
import { EditFilled, LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, MenuProps, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { signOut } from "next-auth/react";
import useSWR from "swr";
import { listFetcher } from "../../../lib/server/listFetcher";
import useSignOut from "../../../hooks/sso/useSginout";

export default function HeaderDropdown() {

  const serverSignOut = useSignOut()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const logout = await serverSignOut.trigger()

    console.log(logout);

    if (logout?.success) {
      const res = await signOut()
      setIsModalOpen(false);
    }

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const { data: GetUserInfo, isLoading: ldGetUserInfo } = useSWR(
    "/Sso/GetUserInfo",
    (url) => listFetcher(url)
  );

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          ویرایش اطلاعات کاربری
        </a>
      ),
      icon: <EditFilled />,
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "خروج",
      onClick: () => {
        showModal();
      },
      icon: <LogoutOutlined />,
      theme: "dark",
    },
  ];

  return (
    <>
      <div className="hover:bg-gray-50 rounded-lg p-1">
        <Dropdown
          trigger={['click']}
          className="flex flex-wrap items-center cursor-pointer"
          menu={{ items }}
        >
          <span>
            <Image
              className="ml-3"
              height={40}
              width={40}
              alt="person-circle icon"
              src="/static/person-circle.svg"
            />
            {ldGetUserInfo ?
              <LoadingOutlined className="text-primary-500 text-lg hidden lg:block" />
              : <div>
                <Typography className="font-normal text-lg hidden lg:block">
                  {GetUserInfo?.lastName}
                </Typography>
                <Typography className="font-semibold text-xs hidden lg:block text-coolGray-400">
                  {GetUserInfo?.firstName}
                </Typography>
              </div>}
            <Image
              className="mr-6 hidden lg:block"
              height={16}
              width={16}
              src={"/static/chevron-down.svg"}
              alt="chevron-down.svg"
            />
          </span>
        </Dropdown>
      </div>
      <Modal
        width={600}
        title="خروج از حساب کاربری"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                // loading={loading}
                size="large"
                className="w-full"
                type="primary"
                loading={serverSignOut.isMutating}
                onClick={handleOk}
                danger
                key={"submit"}>
                خروج
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                // disabled={loading}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleCancel}
                key={"cancel"}>
                انصراف
              </Button>
            </Col>
          </Row>
        ]}
      >
        <p>آیا از خروج خود اطمینان دارید؟</p>
      </Modal>
    </>
  );
}