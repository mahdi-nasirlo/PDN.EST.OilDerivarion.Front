import React from 'react';
import { Button, Col, Form, Modal, Row } from "antd";
import MultipleSelect from "@/components/multiple-select";
import { useRoleAction } from '../hook/use-role-action';


interface TProps {
    open: string | undefined
    setOpen: (arg: string | undefined) => void
}

const RoleAction = ({ open, setOpen }: TProps) => {

    const {
        form,
        rules,
        role,
        updateRole,
        handleSubmit,
        getRole
    } = useRoleAction(setOpen, open)

    return (
        <div>
            <Modal
                title={'تعیین نقش کاربر'}
                open={typeof open == "string"}
                onCancel={() => setOpen(undefined)}
                width={600}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                disabled={getRole.isLoading}
                                loading={updateRole.isPending}
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
                                disabled={updateRole.isPending || getRole.isLoading}
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => setOpen(undefined)}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form layout='vertical' form={form} onFinish={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item rules={[rules]} label="نقش" name="rolesUid">
                                <MultipleSelect
                                    loading={role.isLoading || getRole.isLoading}
                                    treeData={role.treeData} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default RoleAction;