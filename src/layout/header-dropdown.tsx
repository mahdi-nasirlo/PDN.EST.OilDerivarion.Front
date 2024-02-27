"use client"
import {EditFilled, LoadingOutlined, LogoutOutlined} from "@ant-design/icons";
import {Badge, Button, Col, Dropdown, MenuProps, Modal, Row, Typography} from "antd";
import {useHeaderDropdown} from "./hooks/use-header-dropwdown";
import Image from "next/image";
import ProducerLevel1 from '../../public/static/producer-level/Producer-level-1.svg'
import ProducerLevel2 from '../../public/static/producer-level/Producer-level-2.svg'
import ProducerLevel3 from '../../public/static/producer-level/Producer-level-3.svg'
import {SvgIcon} from "@/components/svg-icon";

export default function HeaderDropdown() {

  const {
    confirmExitModal,
    userGetInfo,
    logout,
    unReadMessageCount,
    userMessage
  } = useHeaderDropdown();

  const LevelProducer = () => {
    if (userGetInfo.data?.userLevelId !== null) return <SvgIcon
      src={
        userGetInfo.data?.userLevelId == 3
          ? ProducerLevel3
          : userGetInfo.data?.userLevelId == 2
            ? ProducerLevel2
            : ProducerLevel1
      }
      width={24}
      height={24}
      alt={userGetInfo.data?.userLevelName || ""}
    />
  }

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
      onClick: confirmExitModal.open,
      icon: <LogoutOutlined />,
      theme: "dark",
    },
  ];

  return (
    <>
      <Badge count={unReadMessageCount.data}>
        <Dropdown menu={{
          items: userMessage.data?.map((item) => ({
            key: item.Id,
            label: <div className="bg-gray-100 px-4">
              <div className="font-medium text-right">{item.Subject}</div>
              <div className="text-right">{item.Body}</div>
            </div>
          }))
        }}>
          <Image
              className="mr-4 ml-8"
              height={24}
              width={24}
              alt="chat-bubble-oval-left-ellipsis icon"
              src="/static/chat-bubble-oval-left-ellipsis.svg"
          />
        </Dropdown>
      </Badge>
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
            {userGetInfo.isLoading ?
              <LoadingOutlined className="text-primary-500 text-lg hidden lg:block ml-3" />
              : <div className="ml-3">
                <Typography className="font-normal text-lg hidden lg:block">
                  {userGetInfo.data?.lastName}
                </Typography>
                <Typography className="font-semibold text-xs hidden lg:block text-coolGray-400">
                  {userGetInfo.data?.firstName}
                </Typography>
              </div>
            }
            <LevelProducer />
            <Image
              className="mr-3 hidden lg:block"
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
                key={"submit"}>
                خروج
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                disabled={logout.isPending}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={confirmExitModal.close}
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