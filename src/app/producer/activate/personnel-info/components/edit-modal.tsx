import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import { mutationFetcher } from '../../../../../../lib/server/mutationFetcher';
import useSWRMutation from "swr/mutation";


export default function EditModal(
    {
        mutate,
        recordToEdit,
        setRecordToEdit,
        setIsEditModalVisible,
        isEditModalVisible
    }: {
        mutate: () => void,
        recordToEdit: any
        setRecordToEdit: any,
        isEditModalVisible: any,
        setIsEditModalVisible: any,
    }) {

    //ادیت

    const [form] = useForm()


    const { trigger: UpdateSetEmployeeMember, isMutating: ldUpdateSetEmployeeMember } = useSWRMutation(
        "/Producer/SetEmployeeMember", mutationFetcher)

    const handleConfirmEdit = async (values: any) => {

        values.uid = recordToEdit?.uid

        await UpdateSetEmployeeMember(values)

        await mutate()

        setIsEditModalVisible(false)

        form.resetFields();
    }

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };

    useEffect(() => {
        form.setFieldsValue(recordToEdit)
    }, [recordToEdit])

    return (
        <>
            <Modal
                width={800}
                title="ویرایش عضو شرکت"
                open={isEditModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                loading={ldUpdateSetEmployeeMember}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelEdit}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form onFinish={handleConfirmEdit} disabled={ldUpdateSetEmployeeMember} form={form} layout='vertical'>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="name"
                                label="نام"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="نام خانوادگی"
                                rules={[
                                    { required: true, message: "این فیلد اجباری است" },
                                    { type: "string", message: "باید به صورت متن باشد" },
                                ]}
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="nationalCode"
                                label="کد ملی / کد اتباع"
                                rules={[{ required: true, message: "کد ملی اجباری است" },]}
                            >
                                <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="birthDate" label="تاریخ تولد">
                                <Input />
                                {/* <DatePicker
                                    className="w-full"
                                    placeholder="13**//**"
                                    size="large"
                                /> */}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="currentMobile"
                                label="شماره تماس"
                                rules={[{ required: true, message: "این فیلد اجباری است" },]}
                            >
                                <Input className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>)

}
