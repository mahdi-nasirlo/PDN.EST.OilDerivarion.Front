import {Alert, Button, Col, Divider, Form, Input, Row, Spin, Typography,} from "antd";
import React from "react";
import {ArrowUpOnSquareIcon} from "@heroicons/react/24/outline";
import staticMessages from "@/lib/staticMessages";
import {useRouter} from "next/navigation";
import {materialApi} from "constance/material";
import {z} from "zod";
import useRequestPakagePartUpdateShcematic from "@/hooks/request-package/use-request-pakage-part-update-schematic";
import {RequestPackageApi} from "constance/request-package";
import {Upload, UploadProps} from "antd/lib";
import {UploadChangeParam} from "antd/es/upload";
import {CloudDownloadOutlined, FileAddOutlined} from "@ant-design/icons";
import useUiRequestProductDescriptionForm from "../../hook/use-ui-request-product-description-form";

const props: UploadProps = {
  listType: "picture",
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = "green";
          ctx.textBaseline = "middle";
          ctx.font = "33px Arial";
          ctx.fillText("Ant Design", 20, 20);
          canvas.toBlob((result) => resolve(result as any));
        };
      };
    });
  },
};

const DescriptionForm = ({
  data,
  uid,
  package_uid,
}: {
  uid: string;
  package_uid?: string;
  data:
    | z.infer<typeof materialApi.GetRequestPackagePartList.response.shape.data>
    | undefined;
}) => {
  const { form, rule, updateDesc, requestInfo, onFinish } =
    useUiRequestProductDescriptionForm(uid, package_uid);
  const [fileList, setFileList] = React.useState<any[]>([]);

  const handleChange = async (info: UploadChangeParam) => {
    let file = info.file.originFileObj as File;
    let base64Image = await convertToBase64(file);
    console.log(base64Image);
    setFileList([info.file]);
  };
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const router = useRouter();
  const upload = useRequestPakagePartUpdateShcematic();

  const HandleUpload = async (
    values: z.infer<
      typeof RequestPackageApi.RequestPackagePartUpdateSchematic.type
    >
  ) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj as File;
      const base64Image = await convertToBase64(file);
      values.file_Content_Base64 = base64Image;
    }
    console.log("Form values:", values);
    values.part_UID = uid;
    upload.mutateAsync(values);
  };

  return (
    <>
      <Alert
        className="border-none w-full text-right text-base font-normal text-CustomizeBlue-500 mb-6"
        message={staticMessages.formAlert}
        type="info"
      />
      {data?.map((item, index) => (
        <>
          {item.UID == uid && (
            <>
              <div className="mb-3">
                {item.Status_Message != "" && (
                  <>
                    <Divider />
                    <div className="flex justify-between">
                      <Alert
                        message={
                          item.Status_Message != ""
                            ? "موارد نیازمند به ویرایش"
                            : null
                        }
                        className="text-sm w-full"
                        description={item.Status_Message}
                        type="error"
                      />
                    </div>
                    <Divider />
                  </>
                )}
              </div>
            </>
          )}
        </>
      ))}

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
                  icon={<FileAddOutlined height={16} width={16}/>}
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
        <Form layout="vertical" onFinish={HandleUpload}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24}>
              <Form.Item
                rules={[rule]}
                name="file_Content_Base64"
                label="نمودار شماتیک فرآیند"
                tooltip={<Typography>فایل باید به صورت عکس باشد</Typography>}
              >
                <div className="p-0 m-0 w-full">
                  <Upload
                    className="w-full"
                    {...props}
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    <Button
                      size="large"
                      className="w-full text-right bg-gray-100"
                      icon={<CloudDownloadOutlined />}
                    >
                      بارگزاری نمایید
                    </Button>
                  </Upload>
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24}>
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
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export { DescriptionForm };
