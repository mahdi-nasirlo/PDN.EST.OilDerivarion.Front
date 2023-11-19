import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import useSWR from 'swr';
import FormBuilderFetcher from '../../../../../../../../lib/server/formBuilderFetcher';
import FormBuilder from '../../../../../../../../components/FormBuilder';


export default function CreateModal({
    setIsEditModalVisible,
    isEditModalVisible,
}: {
    isEditModalVisible: any;
    setIsEditModalVisible: any;
}) {

    const [form] = useForm();

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };


    const { data, isLoading: loadingForm } = useSWR("/CategoryForm/GetData",
        (url: string) => FormBuilderFetcher(url, {
            arg: {
                group_ID: "31aefbf6-0e08-4044-8132-b3226253054f",
                groupKey: null,
                category_ID: "b491a1a1-443e-4a65-8d6d-c1d8ce259b6e",
                category_Key: null
            }
        })
    )
    return (
        <>
            <Modal
                width={800}
                title="افزودن مخزن محصول"
                open={isEditModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            {/* <Button
                                // loading={isMutating}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"}
                            >
                                ثبت
                            </Button> */}
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelEdit}
                                key={"cancel"}
                            >
                                انصراف
                            </Button>
                        </Col>
                    </Row>,
                ]}
            >
                <FormBuilder items={data as any} loading={loadingForm} />
            </Modal >
        </>
    )
}



