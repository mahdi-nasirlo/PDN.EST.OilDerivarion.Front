import React from 'react';
import { Button, Col, Form, Modal, Row, Select } from "antd";
import { useBoxGpsStatusList } from '@/hooks/box-gps/use-box-gps-status';
import useBoxGpsStatusForUser from '../hook/use-box-gps-status-for-user';
import { filterOption } from '@/lib/filterOption';

interface TProps {
    open: string | undefined
    setOpen: (arg: string | undefined) => void
}

const StatusBoxAction = ({ open, setOpen }: TProps) => {

    const {
        closeModal,
        get,
        update,
        form,
        rules,
        handleSubmit,
    } = useBoxGpsStatusForUser({ uid: open, setUid: setOpen })

    const BoxGpsStatus = useBoxGpsStatusList()

    return (
        <div>
            <Modal
                title={'تغییر وضعیت جعبه'}
                open={typeof open == "string"}
                onCancel={() => setOpen(undefined)}
                width={800}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                disabled={get.isLoading}
                                loading={update.isPending}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"}
                            >
                                ثبت
                            </Button>
                        </Col>
                        <Col xs={12} md={12}>
                            <Button
                                disabled={update.isPending || get.isLoading}
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
                <Form layout='vertical' form={form} onFinish={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Form.Item rules={[rules]} label="کد" name="code">
                                <Select
                                    disabled
                                    size="large"
                                    showSearch
                                    placeholder="وارد کنید"
                                    options={BoxGpsStatus.options}
                                    loading={BoxGpsStatus.isLoading}
                                    filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item rules={[rules]} label="نام" name="name">
                                <Select
                                    disabled
                                    size="large"
                                    showSearch
                                    placeholder="وارد کنید"
                                    options={BoxGpsStatus.options}
                                    loading={BoxGpsStatus.isLoading}
                                    filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item rules={[rules]} label="وضعیت" name="device_Status">
                                <Select
                                    size="large"
                                    showSearch
                                    placeholder="وارد کنید"
                                    options={BoxGpsStatus.options}
                                    loading={BoxGpsStatus.isLoading}
                                    filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default StatusBoxAction;