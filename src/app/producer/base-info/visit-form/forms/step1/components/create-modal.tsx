import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import useSWR from 'swr';
import FormBuilderFetcher from '../../../../../../../../lib/server/formBuilderFetcher';
import FormBuilder from '../../../../../../../../components/FormBuilder';

export default function CreateModal({
    mutate,
    setIsModalVisible,
    isModalVisible,
}: {
    isModalVisible: any;
    setIsModalVisible: any;
    mutate: () => void;
}) {
    const [form] = useForm();

    const { data, isLoading: loadingForm } = useSWR("/CategoryForm/GetData",
        (url: string) => FormBuilderFetcher(url, {
            arg: {
                group_ID: "31aefbf6-0e08-4044-8132-b3226253054f",
                groupKey: null,
                category_ID: "43ed033a-e22d-4ad8-975a-2978db10b6db",
                category_Key: null
            }
        })
    )

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Modal
                width={800}
                title="افزودن مخزن"
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        {/* <Col xs={24} md={12}>
                            <Button
                                // loading={isMutating}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"}
                            >
                                ثبت
                            </Button>
                        </Col> */}
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancel}
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
