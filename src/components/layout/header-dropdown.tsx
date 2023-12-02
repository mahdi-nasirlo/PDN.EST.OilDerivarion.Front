import Image from "next/image";
import { EditFilled, LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, MenuProps, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderDropdown() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    router.push("/login");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <div>
              <Typography className="font-normal text-lg hidden lg:block">
                نام کاربری
              </Typography>
              <Typography className="font-semibold text-xs hidden lg:block text-coolGray-400">
                سمت شغلی
              </Typography>
            </div>
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
            <Col xs={24} md={12}>
              <Button
                // loading={loading}
                size="large"
                className="w-full"
                type="primary"
                onClick={handleOk}
                danger
                key={"submit"}>
                خروج
              </Button>
            </Col>
            <Col xs={24} md={12}>
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