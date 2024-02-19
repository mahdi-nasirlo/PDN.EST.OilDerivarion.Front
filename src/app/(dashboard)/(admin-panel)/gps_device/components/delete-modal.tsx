import { Button, Checkbox, Col, Form, Input, Modal, Row, Select } from 'antd';
import React from 'react'
import useBoxGpsDeleteDescription from '../hook/use-box-gps-delete-description';


interface TProps {
    uidDelete: any;
    setUidDelete: (arg: any) => void;
}

export default function DeleteModal({ uidDelete, setUidDelete }: TProps) {

    const {
        form,
        rules,
        Delete,
        handelDelete,
        closeModal,
    } = useBoxGpsDeleteDescription(uidDelete, setUidDelete)

    return (
        <Modal
            width={600}
            title={`حذف جعبه`}
            open={uidDelete}
            onCancel={closeModal}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} sm={12}>
                        <Button
                            loading={Delete.isPending}
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={() => form.submit()}
                            danger
                            key={"submit"}>
                            حذف
                        </Button>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Button
                            disabled={Delete.isPending}
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={closeModal}
                            key={"cancel"}>
                            انصراف
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={handelDelete}
            >
                <Row gutter={[16, 10]}>
                    <Col xs={24} sm={24}>
                        <Form.Item
                            label='علت حذف جعبه'
                            name='status'
                            rules={[rules]}
                        >
                            <Select
                                size='large'
                                className='w-full'
                                placeholder="انتخاب کنید"
                                options={[
                                    { label: "خرابی جعبه", value: 0 },
                                    { label: 'عدم تولید', value: 1 }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 10]}>
                    <Col xs={24} sm={24}>
                        <Form.Item
                            label='توضیحات'
                            name='descripton'
                            rules={[rules]}
                        >
                            <Input.TextArea
                                className='w-full'
                                style={{ resize: "none" }}
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="test"
                    valuePropName="checked"
                    rules={[rules]}
                >
                    <Checkbox>
                        به انبار برود
                    </Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
}