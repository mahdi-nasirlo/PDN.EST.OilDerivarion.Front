import React, {useEffect} from 'react';
import {useForm} from "antd/es/form/Form";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import {Button, Col, Form, Modal, Row} from "antd";
import BoxForm from "@/app/admin-panel/add-box/components/box-form";
import {Gps} from "../../../../../interfaces/gps";

function EditModal({modalVisible, setModalVisible, mutate, recordeToEdit}: {
    modalVisible: boolean,
    setModalVisible: any,
    mutate: () => void,
    recordeToEdit: Gps | undefined
}) {

    const [form] = useForm()


    const {trigger, isMutating} = useSWRMutation("/GpsDevice/Update", mutationFetcher)


    const handleSubmit = async (values: Gps) => {

        values.Uid = recordeToEdit?.Uid

        const res = await trigger(values)

        if (res) {

            setModalVisible(false)

            await mutate()

            form.resetFields()

        }

    }

    useEffect(() => {

        form.setFieldsValue(recordeToEdit)

    }, [recordeToEdit])

    return (
        <>
            <Modal
                width={800}
                title="ویرایش جعبه"
                open={modalVisible}
                onOk={() => setModalVisible(true)}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                loading={isMutating}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"}>
                                ثبت
                            </Button>
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                loading={isMutating}
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => setModalVisible(false)}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form disabled={isMutating} form={form} onFinish={handleSubmit} layout="vertical">
                    <BoxForm/>
                </Form>
            </Modal>
        </>
    );
}

export default EditModal;