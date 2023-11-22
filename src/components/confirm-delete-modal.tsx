import React from 'react';
import { Button, Col, Modal, Row } from "antd";

function ConfirmDeleteModal({ open, setOpen, handleDelete, title, loading }: {
    open: boolean,
    setOpen: (arg: boolean) => void,
    handleDelete: () => void,
    title: string,
    loading?: boolean
}) {
    return (
        <Modal
            width={600}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            loading={loading}
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={handleDelete}
                            danger
                            key={"submit"}>
                            حذف
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            disabled={loading}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={() => {
                                setOpen(false)
                            }}
                            key={"cancel"}>
                            انصراف
                        </Button>
                    </Col>
                </Row>
            ]}
            title={title}
            open={open}
            onCancel={() => {
                setOpen(false)
            }}
        >
            <p>آیا از حذف این {title} مطمئن هستید؟</p>
        </Modal>
    );
}

export default ConfirmDeleteModal;