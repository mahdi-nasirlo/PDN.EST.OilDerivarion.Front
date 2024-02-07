import React from 'react'
import { Button, Col, Form, Modal, Row } from 'antd';
import { TestItemApi } from 'constance/test-item';
import { useValidation } from '@/hooks/use-validation';
import TestItemForm from './test-item-form';
import { useTestItemCreate } from '@/hooks/basic/test_item/use-test-item-create';

interface TProps {
    modalVisible: boolean
    setModalVisible: (arg: boolean) => void
}

const formSchema = TestItemApi.BasicTestItemCreate.type

export default function CreateModal({ modalVisible, setModalVisible }: TProps) {

    const [form, rules] = useValidation(formSchema);

    const create = useTestItemCreate();

    const closeModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <Modal
            width={800}
            title={
                <div>
                    <div className="text-base mb-2">افزودن فاکتور آزمون</div>
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
                <TestItemForm rules={rules} />

            </Form>
        </Modal>
    )
}
