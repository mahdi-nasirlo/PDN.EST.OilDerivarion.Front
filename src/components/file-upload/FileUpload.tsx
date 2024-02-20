import React, { useEffect, useState } from "react";
import "filepond/dist/filepond.min.css";
import "./style.stylesheet.css";
import { Button, Upload } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { UploadFile, UploadProps } from "antd/lib";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import useUpload from "@/hooks/file/use-uplod";
import useRequestPakagePartUpdateShcematic from "@/hooks/request-package/use-request-pakage-part-update-schematic";
import { info, log } from "console";
import useDownload from "@/hooks/file/use-download";

const defualtProps: UploadProps = {
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
          ctx.fillStyle = "red";
          ctx.textBaseline = "middle";
          ctx.font = "33px Arial";
          canvas.toBlob((result) => resolve(result as any));
        };
      };
    });
  },
};

const FileUpload = (
  props: UploadProps & { payload?: any; defaultFiles?: string }
) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleChange = async (info: UploadChangeParam) => {
    setFileList(info.fileList);
  };

  const upload = useRequestPakagePartUpdateShcematic();

  const download = useDownload();

  const handleUpload = async (options: any) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj as File;
      const base64Image = await convertToBase64(file);
      options.file_Content_Base64 = base64Image;
    }

    // values.part_UID = uid;
    options = { ...options, ...props.payload };

    const res = await upload.mutateAsync(options);

    if (res.success) options?.onSuccess();
    else options.onError();
  };

  const setFiles = async () => {
    if (props.defaultFiles) {
      const res = await download.mutateAsync({
        uid: props.defaultFiles,
      });

      setFileList([
        {
          name: "شماتیک فرآیند",
          uid: "",
          thumbUrl: res?.data?.File_Content_Base64,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(props.defaultFiles);

    setFiles();
  }, [props.defaultFiles]);

  return (
    <>
      <Upload
        accept="image/*"
        className="w-full"
        multiple={false}
        maxCount={1}
        {...props}
        {...defualtProps}
        fileList={fileList}
        onChange={handleChange}
        customRequest={handleUpload}
      >
        <Button
          size="large"
          className="w-full text-right bg-gray-100"
          icon={<CloudDownloadOutlined />}
        >
          بارگزاری نمایید
        </Button>
      </Upload>
    </>
  );
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file as any);
  });
};

export default FileUpload;
