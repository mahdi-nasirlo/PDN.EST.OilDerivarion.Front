"use client"

import { Alert, Image, Typography, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import Test from './test'

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export default function Page() {
    const [base64Image, setBase64Image] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await fetch('https://demo.twic.pics/cat_1x1.jpg?1080twic=v1/output=preview');
                const blob = await response.blob();
                const file = blob as File;
                const base64 = await getBase64(file);
                setBase64Image(base64 as string);
            } catch (error: any) {

                notification.open({
                    type: "error",
                    message: error.message,
                });

                return <Alert className="text-right" type="error" message="خطا در برقراری ارتباط" />;
            }
        };
        loadImage();
    }, []);

    return (
        <>
            <div className="box-border p-6">
                <Test />
                <Typography>
                    تست نمایش فیلم و عکس
                </Typography>
                <Typography className='font-bold text-primary-500 my-4'>
                    عکس ها
                </Typography>
                <div className="grid max-md:grid-cols-3 gap-4 grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        base64Image && (
                            <Image
                                key={index}
                                loading='lazy'
                                src={base64Image}
                                width="100%"
                                height="100%"
                                alt={`Base64 Image ${index + 1}`}
                            />
                        )
                    ))}
                </div>
                <Typography className='font-bold text-primary-500 my-4'>
                    فیلم ها
                </Typography>
                <div className="grid max-md:grid-cols-3 gap-4 grid-cols-6">
                    {base64Image && <Image
                        alt="Base64 move"
                        width="100%"
                        preview={{
                            imageRender: () => (
                                <video
                                    autoPlay
                                    width="100%"
                                    controls
                                    src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
                                />
                            ),
                            toolbarRender: () => null,
                        }}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />}
                </div>
            </div >
        </>
    )
}

