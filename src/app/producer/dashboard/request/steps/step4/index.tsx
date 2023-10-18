import React, {useContext, useState} from 'react';
import ReviewDataTable from "@/app/producer/dashboard/request/steps/step4/review-data-table";
import {Button, Checkbox, Col, Divider, Form, Row, Spin} from "antd";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useForm} from "antd/es/form/Form";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../../lib/server/mutationFetcher";
import ReviewDataModalAcceptAgreement
    from "@/app/producer/dashboard/request/steps/step4/review-data-modal-accept-agreement";
import ReviewDataModalFinalSubmit from "@/app/producer/dashboard/request/steps/step4/review-data-modal-final-submit";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";

const Index = () => {

    const processController = useContext(StepContext)

    const [modalVisibleConfirmation, setModalVisibleConfirmation] = useState(false);
    const [modalVisibleFinalSubmit, setModalVisibleFinalSubmit] = useState(false);

    const [form] = useForm()

    const {trigger, isMutating} = useSWRMutation("/RequestMaster/UpdateCompleted", mutationFetcher)

    const onFinish = async () => {
        const data = await trigger({
            "uid": processController.requestMaster.requestMasterUid
        })

        if (data) {
            setModalVisibleFinalSubmit(true)
        }
    };

    return (
        <>
            <ReviewDataTable/>

            <Divider/>
            <Spin spinning={processController.isMutating}>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                >
                    <Form.Item
                        className=" mr-3 my-6  font-medium"
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('پذیرش شرایط و قوانین برای ثبت درخواست ضروری می باشد')),
                            },
                        ]}
                    >
                        <Checkbox>
                            شرایط و <span className="text-primary-500 p-0"
                                          onClick={() => setModalVisibleConfirmation(true)}>قوانین</span> را
                            خوانده و می پذیرم!
                        </Checkbox>
                    </Form.Item>
                    <Divider/>
                    <Row gutter={[10, 0]}>
                        <Col span={8}>
                            <Button type="dashed" className="bg-gray-100 w-full"
                                    onClick={() => processController.dispatch({type: "PREVIOUS"})}>
                                مرحله قبل
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button
                                onClick={processController.getNextStep}
                                className="w-full bg-gray-50 flex items-center justify-center"
                                size="large"
                                icon={<PlusIcon width={24} height={24}/>}
                            >
                                افزودن مواد اولیه و محصول جدید
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button
                                className="w-full management-info-form-submit btn-filter"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                <span className="flex gap-3 justify-center ">ثبت و تایید نهایی</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Spin>
            <ReviewDataModalAcceptAgreement
                modalVisibleConfirmation={modalVisibleConfirmation}
                setModalVisibleConfirmation={setModalVisibleConfirmation}
            />
            <ReviewDataModalFinalSubmit
                modalVisibleFinalSubmit={modalVisibleFinalSubmit}
                setModalVisibleFinalSubmit={setModalVisibleFinalSubmit}
            />
        </>
    );
};

export default Index;