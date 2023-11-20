import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { mutationFetcher } from '../../../../../../lib/server/mutationFetcher';
import useSWRMutation from "swr/mutation";
import ManagementUserForm from './management-user-form';

export default function EditModal(
    { isEditModalVisible, setIsEditModalVisible, setRecordToEdit, recordToEdit, mutate }:
        { isEditModalVisible: any, setIsEditModalVisible: any, setRecordToEdit: any, recordToEdit: any, mutate: any }) {

    const [userTypeId, setUserTypeId] = useState<any>(null);

    useEffect(() => {

        form.setFieldsValue(recordToEdit);

    }, [recordToEdit])

    const [form] = useForm();

    const { trigger, isMutating } = useSWRMutation("/User/Update", mutationFetcher);

    const handleConfirmEdit = async (values: any) => {
        const res = await trigger({
            uid: recordToEdit?.Uid,
            ...values,
        });
        if (res) {
            await mutate();
            setIsEditModalVisible(false);
        }
        form.resetFields();
    };

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };



    return (
        <Modal
            width={800}
            title="ویرایش کاربر"
            visible={isEditModalVisible}
            onOk={handleConfirmEdit}
            onCancel={handleCancelEdit}
            footer={[
                <Row key={"box"} gutter={[16, 16]} className="my-2">
                    <Col xs={24} md={12}>
                        <Button
                            size="large"
                            className="w-full"
                            type="primary"
                            onClick={() => form.submit()}
                            loading={isMutating}
                            key={"submit"}
                        >
                            ثبت
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Button
                            size="large"
                            className="w-full bg-gray-100 text-warmGray-500"
                            onClick={handleCancelEdit}
                            disabled={isMutating}
                            key={"cancel"}
                        >
                            انصراف
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <ManagementUserForm
                form={form}
                handleConfirmEdit={handleConfirmEdit}
                isMutating={isMutating}
            />
        </Modal>
    )
}
