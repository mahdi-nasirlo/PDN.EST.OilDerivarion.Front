import React from 'react'
import MaterialForm from './material-form'
import { Button, Col, Modal, Row } from 'antd'
import { Form } from 'antd/lib';

interface TProps {
    uid: string,
    visibleModal: any,
    setVisibleModal: any
}

export default function CreateModal({ visibleModal, setVisibleModal, uid }: TProps) {

    const handleConfirm = () => setVisibleModal(false);


    const handleCancel = () => setVisibleModal(false);

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">افزودن مواد اولیه</div>
                    <div className="font-normal text-sm">
                        لطفا اطلاعات را وارد نمایید.
                    </div>
                </div>
            }
            open={visibleModal}
            onCancel={handleCancel}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={handleConfirm}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={handleCancel}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form layout='vertical'>
                <MaterialForm />
            </Form>
        </Modal>

    )
}
