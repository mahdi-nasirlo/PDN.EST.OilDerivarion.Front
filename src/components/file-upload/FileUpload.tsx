import React, {useState} from 'react';
import 'filepond/dist/filepond.min.css';
import './style.stylesheet.css'
import {Button, Upload} from "antd";
import {CloudDownloadOutlined} from "@ant-design/icons";
import {UploadFile, UploadProps} from "antd/lib";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import useUpload from "@/hooks/file/use-uplod";


const props: UploadProps = {
    listType: 'picture',
    beforeUpload(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d')!;
                    ctx.drawImage(img, 0, 0);
                    ctx.fillStyle = 'red';
                    ctx.textBaseline = 'middle';
                    ctx.font = '33px Arial';
                    ctx.fillText('Ant Design', 20, 20);
                    canvas.toBlob((result) => resolve(result as any));
                };
            };
        });
    },
};

const FileUpload = () => {

    const {mutateAsync} = useUpload()

    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleOnChange = (e: UploadChangeParam) => {

        setFiles(e.fileList)

    }

    props.customRequest = async options => {

        try {
            console.log(options)

            const file = new FormData()

            file.append("file", options.file as RcFile, "tesxt.png")

            // const res = await mutateAsync(file)
            //
            // if (res.success) {
            //     // @ts-ignore
            //     options.onSuccess()
            // } else {
            //     // @ts-ignore
            //     options.onError()
            // }

            // const token = await getTokenFromSession()
            //
            // const res: z.infer<typeof generalResponseZod> = await fetch(process.env.NEXT_PUBLIC_API_URL + fileApi.Upload.url, {
            //     method: 'POST',
            //     body: file,
            //     headers: {
            //         "Authorization": token || "",
            //     }
            // })

            // if (res.success) {
            // @ts-ignore
            options?.onSuccess()
            // }
            // if (res.status >= 200 && res.status < 300) {
            //     // @ts-ignore
            //     options?.onSuccess()
            // } else {
            //     // @ts-ignore
            //     options.onError()
            // }
        } catch (e) {
            console.log()
        }

    }

    return (
        <>
            <Upload
                className="w-full"
                {...props}
                fileList={files}
                onChange={handleOnChange}
            >
                <Button
                    size="large"
                    className="w-full text-right bg-gray-100"
                    icon={<CloudDownloadOutlined/>}
                >
                    بارگزاری نمایید
                </Button>
            </Upload>
        </>
    );
};

export default FileUpload;