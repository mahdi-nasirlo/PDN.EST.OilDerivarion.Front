import React from 'react'
import {Button, Col, Modal, Row} from 'antd'

export default function EditModal({ editModal, setEditModal }: any) {

    const handleConfirmEdit = () => setEditModal(false)

    const handleCancelEdit = () => setEditModal(false)

    return (
        <Modal
            width={800}
            title="ویرایش مواد اولیه"
            open={editModal}
            onOk={handleConfirmEdit}
            onCancel={handleCancelEdit}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={handleConfirmEdit}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={handleCancelEdit}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            {/*<MaterialForm rules={[]}/>*/}
        </Modal>

    )
}
