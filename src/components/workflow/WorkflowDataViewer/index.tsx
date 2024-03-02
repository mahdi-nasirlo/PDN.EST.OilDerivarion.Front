import React, { useEffect } from 'react';
import { formMakerApi } from "../../../constance/form-maker";
import { ZodErrorAlert } from "@/components/zod-error-alert";
import { Empty, Image } from "antd";
import { Col, Descriptions, Divider, Row, Table, TableColumnsType, Typography } from "antd/lib";
import { Card } from "@/components/card";
import { useQueries } from '@tanstack/react-query';
import fetchWithSession from '@/utils/fetch-with-session';
import { fileApi } from 'constance/file';

interface PropsType {
    data: string,
}

const Index = ({ data }: PropsType) => {

    console.log(data);


    const validateData = formMakerApi.ProducerFormsGetDocSchemaByUid.type1Res.safeParse(data)

    if (!data) {
        return <Empty />
    }

    if (!validateData.success) {
        return <ZodErrorAlert success={false} error={validateData.error} />
    }

    const renderCard = () => {

        const cardData = validateData.data

        const view: React.ReactNode[] = []


        cardData.map((item, cardIndex) => {

            view.push(<Typography className="mb-5 font-semibold text-lg text-right">{item.Title}</Typography>)

            view.push(<Descriptions column={6}>
                {item.Model?.map((item, index) => (<Descriptions.Item
                    key={index}
                    span={typeof item.Value == "string" ? 3 : 6}
                    label={item.Key}
                >
                    {item.Value}
                </Descriptions.Item>))}
            </Descriptions>)

            item.ListTable?.map(table => {

                const columns: TableColumnsType<any> | undefined = table?.Header?.map((column) => ({
                    dataIndex: column.Key,
                    title: column.Value
                }))

                view.push(<Card className="bg-gray-100">
                    <Typography className="text-right text-lg font-semibold mb-3">
                        {table?.Title}
                    </Typography>
                    <div className="w-full">
                        <Table
                            columns={columns}
                            dataSource={table?.Values}
                        />
                    </div>
                </Card>)

            })

            const desc: React.ReactNode[] = []

            for (let key in item.Table?.Values) {

                const column = item.Table?.Header?.find((item) => item.Key == key)

                const value = item.Table?.Values?.[key]

                if (column?.Value)
                    desc.push(<Descriptions.Item
                        span={6}
                        label={column?.Value}
                    >
                        {value}
                    </Descriptions.Item>)

            }

            if (desc.length > 0) view.push(<Card className="bg-gray-100">
                <Descriptions
                    className="text-right text-secondary-500"
                    column={6}
                >
                    {desc}
                </Descriptions>
            </Card>)

            const imageView: React.ReactNode[] = []

            item.Media?.Images?.map((image, index) => imageView.push(<Col span={4}>
                <Image
                    key={index}
                    loading='lazy'
                    src={`${apiDonwload.url}?id=${image}`}
                    width="100%"
                    height="100%"
                    alt={`Base64 Image ${index + 1}`}
                />
            </Col>))

            let videoView: React.ReactNode[] = []

            item.Media?.Videos?.map((video, index) => videoView.push(<Col span={4}>
                <Image
                    alt="Base64 move"
                    width="100%"
                    preview={{
                        imageRender: () => (
                            <video
                                autoPlay
                                width="100%"
                                controls
                                src={`${apiDonwload.url}?id=${video}`}
                            />
                        ),
                        toolbarRender: () => null,
                    }}
                    src="https://placehold.co/600x400?text=video"
                />
            </Col>))

            view.push(<Row gutter={[12, 16]}>
                {imageView}
                {videoView}
            </Row>)

            if (cardIndex !== (cardData.length - 1)) {
                view.push(<Divider />)
            }
        })

        return view
    }

    return renderCard()
};

const apiDonwload = fileApi.Download

const RenderImages = ({ imagesUid }: { imagesUid: string[] }) => {

    const imageQueries = useQueries({
        queries: imagesUid.map(image => ({
            queryKey: [apiDonwload.url, image],
            queryFn: () => fetchWithSession({
                url: apiDonwload.url, data: {
                    uid: image
                }
            }),
            // select: (data: z.infer<typeof apiDonwload.response>) => data.data.File_Content_Base64
        }))
    })

    // useEffect(() => {
    //     console.log(imageQueries[0].data.data.File_Content_Base64);
    // }, [imageQueries])

    return imageQueries.map((image, index) => <Image
        key={index}
        loading='lazy'
        src={image.data?.data?.File_Content_Base64}
        width="100%"
        height="100%"
        alt={`Base64 Image ${index + 1}`}
    />)
}

export default Index;