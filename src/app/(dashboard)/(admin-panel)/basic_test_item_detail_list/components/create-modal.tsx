import React from 'react'
import { Button, Col, Form, Modal, Row } from 'antd';
import { useValidation } from '@/hooks/use-validation';
import { TestItemDetailApi } from 'constance/test-item-detail';
import TestItemDetailForm from './test-item-detail-form';
import { useTestItemDetailCreate } from '@/hooks/basic/test-item-detail/use-test-item-detail-create';

interface TProps {
    modalVisible: boolean
    setModalVisible: (arg: boolean) => void
}

const formSchema = TestItemDetailApi.BasicTestItemDetailCreate.type

export default function CreateModal({ modalVisible, setModalVisible }: TProps) {

    const [form, rules] = useValidation(formSchema);

    const create = useTestItemDetailCreate();

    const closeModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">افزودن استاندارد آزمون</div>
                    <div className="font-normal text-sm">
                        لطفا اطلاعات را وارد نمایید.
                    </div>
                </div>
            }
            open={modalVisible}
            onCancel={closeModal}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={12} md={12}>
                        <Button
                            onClick={() => form.submit()}
                            size="large"
                            className="w-full"
                            type="primary"
                            key={"submit"}
                            loading={create.isPending}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button
                            disabled={create.isPending}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={closeModal}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                disabled={create.isPending}
                onFinish={async (values) => {
                    const res = await create.mutateAsync(values)
                    if (res.success) {
                        setModalVisible(false);
                        form.resetFields();
                    }
                }}
                form={form}
                layout="vertical"
            >
                <TestItemDetailForm rules={rules} />

            </Form>
        </Modal>
    )
}
