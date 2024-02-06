import React from 'react'
import ProductForm from './product-form'
import {Button, Col, Modal, Row} from 'antd';
import {Form} from "antd/lib";
import useUiRequestPackageProductCreate
    from "@/app/(dashboard)/request/[uid]/products/hook/use-ui-request-package-product-create";

interface TProps {
    uid: string,
    visibleModal: boolean,
    setVisibleModal: (arg: any) => void
}

export default function CreateModal({visibleModal, setVisibleModal, uid}: TProps) {

    const {
        onFinish,
        addProduct,
        requestInfo,
        form,
        rules,
        onClose
    } = useUiRequestPackageProductCreate({uid, visibleModal, setVisibleModal})

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">افزودن محصول</div>
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
                            loading={addProduct.isPending || requestInfo.isFetching}
                            disabled={addProduct.isPending || requestInfo.isFetching}
                            type="primary"
                            onClick={() => form.submit()}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            disabled={addProduct.isPending || requestInfo.isFetching}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={onClose}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <ProductForm rules={rules}/>
            </Form>
        </Modal>
    )
}
