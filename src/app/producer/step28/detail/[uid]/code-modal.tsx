import React from 'react'
import { Button, Col, Modal, Row } from 'antd'

export default function CodeModal({
    openModal,
    SetOpenModal,
    recordToEdit,
    Code
}: {
    openModal: any,
    SetOpenModal: any,
    recordToEdit: any,
    Code: any
}) {

    return (
        <Modal
            width={600}
            title={
                <div className='flex gap-3'>
                    <div>کد رهگیری</div>
                    <div className='text-secondary-500'>{Code}</div>
                </div>
            }
            open={openModal}
            onCancel={() => SetOpenModal(false)}
            footer={
                [
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={24}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => SetOpenModal(false)}
                                key={"cancel"}
                            >
                                بازگشت
                            </Button>
                        </Col>
                    </Row>,
                ]}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <span>نام محصول : </span>
                    <span>{recordToEdit?.ProductName}</span>
                </Col>
                <Col span={12}>
                    <span>کد رهگیری : </span>
                    <span>{Code}</span>
                </Col>
                <Col span={12}>
                    <span>درصد استحصال : </span>
                    <span>{recordToEdit?.ProductUsageExploitation} % </span>
                </Col>
                <Col span={12}>
                    <span>درصد هدر رفت : </span>
                    <span>{recordToEdit?.ProductUsageWasted} % </span>
                </Col>
            </Row>
        </Modal>
    )
}
