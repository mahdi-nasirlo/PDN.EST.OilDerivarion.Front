import React, {useEffect} from "react";
import {Button, Col, Divider, Form, Input, Row, Spin, Typography} from "antd";
import {UploadProps} from "antd/lib";
import {FileAddOutlined} from "@ant-design/icons";
import useUiRequestProductDescriptionForm from "../../hook/use-ui-request-product-description-form";
import FileUpload from "@/components/file-upload/FileUpload";

const props: UploadProps = {
  listType: "picture",
  // beforeUpload(file) {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const img = document.createElement("img");
  //       img.src = reader.result as string;
  //       img.onload = () => {
  //         const canvas = document.createElement("canvas");
  //         canvas.width = img.naturalWidth;
  //         canvas.height = img.naturalHeight;
  //         const ctx = canvas.getContext("2d")!;
  //         ctx.drawImage(img, 0, 0);
  //         ctx.fillStyle = "green";
  //         ctx.textBaseline = "middle";
  //         ctx.font = "33px Arial";
  //         ctx.fillText("Ant Design", 20, 20);
  //         canvas.toBlob((result) => resolve(result as any));
  //       };
  //     };
  //   });
  // },
};

const DescriptionForm = ({
  uid,
  package_uid,
}: {
  uid: string;
  package_uid?: string;
}) => {
  const { form, rule, updateDesc, requestInfo, onFinish } =
    useUiRequestProductDescriptionForm(uid, package_uid);

  useEffect(() => {
    console.log(requestInfo.data?.schematic_file_UID)
  }, [requestInfo.data?.schematic_file_UID])

  return (
    <>
      <Typography className="text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Divider />
      <Spin spinning={requestInfo.isFetching}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item
                className="mb-10"
                rules={[rule]}
                name="process_description"
                required={false}
                label="شرح فرآیند تولید"
              >
                <Input.TextArea
                  showCount
                  minLength={50}
                  style={{ resize: "none" }}
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className={"flex w-full justify-end"}>
            <Col xs={24} xxl={3} md={6} sm={8}>
              <Button
                className="flex items-center justify-center w-full"
                icon={<FileAddOutlined height={16} width={16} />}
                type="primary"
                size="large"
                htmlType="submit"
                loading={updateDesc.isPending}
                disabled={updateDesc.isPending || requestInfo.isFetching}
              >
                ثبت شرح فرآیند
              </Button>
            </Col>
          </div>
          <Divider />
          {/* <Row gutter={[16, 16]}>
            <Col xs={24} sm={24}>
              <Form.Item
                rules={[rule]}
                name="schematic_file_UID"
                label="نمودار شماتیک فرآیند"
                tooltip={<Typography>فایل باید به صورت pdf باشد</Typography>}
              >
                <div className="p-0 m-0 w-full">
                  <FileUpload />
                </div>
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24}>
              <Form.Item
                rules={[rule]}
                name="schematic_file_UID"
                label="نمودار شماتیک فرآیند"
                tooltip={<Typography>فایل باید به صورت عکس باشد</Typography>}
              >
                <div className="p-0 m-0 w-full">
                  <FileUpload
                    payload={{
                      part_UID: uid,
                      package_UID: package_uid,
                    }}
                    defaultFiles={requestInfo.data?.schematic_file_UID}
                  />
                </div>
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24}>
              <Button
                className="flex items-center justify-center w-full"
                type="primary"
                size="large"
                htmlType="submit"
                // loading={updateDesc.isPending}
                // disabled={updateDesc.isPending || requestInfo.isFetching}
                icon={<ArrowUpOnSquareIcon className="w-6" />}
              >
                ثبت بارگزاری
              </Button>
            </Col> */}
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export { DescriptionForm };
