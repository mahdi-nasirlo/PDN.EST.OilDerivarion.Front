import React from 'react'
import { Col, Modal, Row, Spin, Typography } from 'antd'
import useGetUserMessage from '@/hooks/message/use-get-user-message'

interface TProps {
    open: string | undefined
    setOpen: (value?: string) => void
    userName: string
}


export default function MessageModal({ open, setOpen, userName }: TProps) {

    const getUserMessage = useGetUserMessage({
        userName: userName,
        uid: open as string,
        direction: true,
    })


    return (
        <Modal
            width={700}
            open={typeof open == "string"}
            onCancel={() => setOpen(undefined)}
            title={<Typography>{getUserMessage.data?.Subject || "عنوان پیام"}</Typography>}
            footer={null}
        >
            <Spin spinning={getUserMessage.isLoading || getUserMessage.isFetching}>
                <Row gutter={[16, 0]} className='mb-5'>
                    <Col xs={24} sm={12}>
                        <span className='text-gray-500'>تاریخ ارسال : </span>
                        <span>{getUserMessage.data?.Write_Date}</span>
                    </Col>
                    <Col xs={24} sm={12}>
                        <span className='text-gray-500'>تاریخ مشاهده : </span>
                        <span>{getUserMessage.data?.Read_Date}</span>
                    </Col>
                </Row>
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24}>
                        <span className='text-gray-500'>متن پیام : </span>
                        <span>{getUserMessage.data?.Body}</span>
                    </Col>
                </Row>
            </Spin>
        </Modal>
    )
}
