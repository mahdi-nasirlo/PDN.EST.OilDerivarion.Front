"use client"
import {EditFilled, LoadingOutlined, LogoutOutlined} from "@ant-design/icons";
import {Button, Col, Dropdown, MenuProps, Modal, Row, Typography} from "antd";
import {useHeaderDropdown} from "./hooks/use-header-dropwdown";
import Image from "next/image";
// import ProducerLevel1 from '../../public/static/producer-level/Producer-level-1.svg'
// import ProducerLevel2 from '../../public/static/producer-level/Producer-level-2.svg'
// import ProducerLevel3 from '../../public/static/producer-level/Producer-level-3.svg'

export default function HeaderDropdown() {

  const { confirmExitModal, userInfo, logout } = useHeaderDropdown();

  const LevelProducer = () => {
    // if (userInfo.data !== null)
    //   return <SvgIcon
    //     src={
    //       userInfo.data?.firstName == ""
    //         ? ProducerLevel3
    //         : userInfo.data?.firstName == "1"
    //           ? ProducerLevel2
    //           : ProducerLevel1
    //     }
    //     width={24}
    //     height={24}
    //     alt={userInfo.data?.firstName || ""}
    //   />
    // else return null;
    return null
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
            {userInfo.isLoading ?
              <LoadingOutlined className="text-primary-500 text-lg hidden lg:block" />
              : <div>
                <Typography className="font-normal text-lg hidden lg:block">
                  {userInfo.data?.lastName}
                </Typography>
                <Typography className="font-semibold text-xs hidden lg:block text-coolGray-400">
                  {userInfo.data?.firstName}
                </Typography>
              </div>
            }
            <LevelProducer />
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