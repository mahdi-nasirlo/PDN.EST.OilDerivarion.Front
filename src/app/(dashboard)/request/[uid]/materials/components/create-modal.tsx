import React from 'react'
import MaterialForm from './material-form'
import {Button, Col, Modal, Row} from 'antd'
import {Form} from 'antd/lib';
import useUiRequestMaterialCreate from "@/app/(dashboard)/request/[uid]/materials/hook/use-ui-request-material-create";

interface TProps {
    uid: string,
    visibleModal: any,
    setVisibleModal: any
}

const type = 1

export default function CreateModal({visibleModal, setVisibleModal, uid: partUid}: TProps) {

    const {addMaterial, rules, onFinish, form, onClose, requestInfo} = useUiRequestMaterialCreate({
        uid: partUid,
        visibleModal,
        setVisibleModal
    })

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
            onCancel={onClose}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={() => form.submit()}
                            key={"submit"}
                            disabled={addMaterial.isPending}
                            loading={addMaterial.isPending || requestInfo.isFetching}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={onClose}
                            key={"cancel"}
                            disabled={addMaterial.isPending || requestInfo.isFetching}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
            >
                <MaterialForm rules={rules}/>
            </Form>
        </Modal>

    )
}
