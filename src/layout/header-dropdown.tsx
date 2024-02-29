"use client";
import { EditFilled, LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, MenuProps, Modal, Row, Typography } from "antd";
import { useHeaderDropdown } from "./hooks/use-header-dropwdown";
import Image from "next/image";
// import ProducerLevel1 from '../../public/static/producer-level/Producer-level-1.svg'
import ProducerLevel2 from "../../public/static/producer-level/Producer-level-2.svg";
import ProducerLevel3 from "../../public/static/producer-level/Producer-level-3.svg";
import { SvgIcon } from "@/components/svg-icon";
import MessageListDropdown from "./message-list-dropdown";
import Link from "next/link";

export default function HeaderDropdown() {
  const { confirmExitModal, userGetInfo, logout } = useHeaderDropdown();

  const LevelProducer = () => {
    if (userGetInfo.isLoading || userGetInfo.isFetching) {
      return null;
    }
    if (userGetInfo.data?.userLevelId !== null)
      return (
        <div className="hidden lg:block">
          <SvgIcon
            width={24}
            height={24}
            alt={userGetInfo.data?.userLevelName || ""}
            src={
              userGetInfo.data?.userLevelId == 3
                ? ProducerLevel3
                : userGetInfo.data?.userLevelId == 2
                ? ProducerLevel2
                : ProducerLevel2 // -->  ProducerLevel1
            }
          />
        </div>
      );
  };

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <Link target="_blank" rel="noopener noreferrer" href="/">
          ویرایش اطلاعات کاربری
        </Link>
      ),
      icon: <EditFilled />,
      disabled: true,
    },
    { type: "divider" },
    {
      key: "4",
      danger: true,
      label: "خروج",
      onClick: confirmExitModal.open,
      icon: <LogoutOutlined />,
      theme: "dark",
    },
  ];

  return (
    <>
      {/* <MessageListDropdown /> */}
      <div className="hover:bg-gray-50 rounded-lg p-1">
        <Dropdown
          placement="bottom"
          trigger={["click"]}
          className="flex items-center cursor-pointer gap-4"
          menu={{ items }}
        >
          <span>
            <Image
              height={40}
              width={40}
              alt="person-circle icon"
              src="/static/person-circle.svg"
            />
            {userGetInfo.isLoading || userGetInfo.isFetching ? (
              <LoadingOutlined className="text-primary-500 text-lg hidden lg:block" />
            ) : (
              <div>
                <Typography className="font-normal text-lg hidden lg:block">
                  {userGetInfo.data?.lastName}
                </Typography>
                <Typography className="font-semibold text-sm hidden lg:block text-coolGray-400">
                  {userGetInfo.data?.firstName}
                </Typography>
              </div>
            )}
            <LevelProducer />
            <Image
              height={20}
              width={20}
              className="hidden lg:block"
              src={"/static/chevron-down.svg"}
              alt="chevron-down.svg"
            />
          </span>
        </Dropdown>
      </div>
      <Modal
        width={600}
        title="خروج از حساب کاربری"
        open={confirmExitModal.isOpen}
        onCancel={confirmExitModal.close}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                loading={logout.isPending}
                disabled={logout.isPending}
                size="large"
                className="w-full"
                type="primary"
                onClick={logout.execute}
                danger
                key={"submit"}
              >
                خروج
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                loading={logout.isPending}
                disabled={logout.isPending}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={confirmExitModal.close}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <p>آیا از خروج خود اطمینان دارید؟</p>
      </Modal>
    </>
  );
}
