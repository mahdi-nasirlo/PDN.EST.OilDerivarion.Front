import React, {useEffect} from 'react';
import {Button, Col, Divider, Form, Input, Row} from "antd/lib";
import {CommentWorkflowSelectField} from "@/components/fields/commenct-workflow-select-field";
import {TestItemsMultipleSelectField} from "@/components/fields/test-items-multiple-select-field";
import {z} from "zod";
import {RequestPackageApi} from "../../../../../../../../constance/request-package";
import useUiOpinionForm
    from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/hook/use-ui-opinion-form";

const EstOpinionForm = ({request, uid}: {
    request: z.infer<typeof RequestPackageApi.FinalResultList.item>,
    uid: string
}) => {

    const {
        displayTestItem,
        setDisplayTestItem,
        form,
        onFinish,
        add
    } = useUiOpinionForm(uid, request)

    useEffect(() => {
        setDisplayTestItem(request.est_Opinion_ID)
    }, [request])

    return (
        <div>
            <div className="my-5">
                <Divider orientation="left">
                    کارشناس استاندارد
                </Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    disabled={add.isPending || request.visit_Type !== 3}
                    layout="vertical"
                >
                    <Row gutter={[12, 18]}>
                        <Col sm={12}>
                            <Form.Item
                                label="نظر نهایی"
                                name="est_Opinion_ID"
                            >
                                <CommentWorkflowSelectField onChange={value => setDisplayTestItem(value)}/>
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            {displayTestItem == 3 && <Form.Item
                                label="فاکتور های آزمون"
                                name={"est_test_item"}
                            >
                                <TestItemsMultipleSelectField/>
                            </Form.Item>}
                        </Col>
                    </Row>

                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="est_opinion_description"
                        label="توضیحات"
                    >
                        <Input.TextArea
                            style={{height: 100, resize: "none"}}
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                    <Form.Item
                        label="آخرین ویرایش"
                        name="est_result_modify_date_time"
                    >
                        <Input readOnly={true} disabled={true}/>
                    </Form.Item>
                    {request.visit_Type == 3 &&
                        <Button loading={add.isPending} htmlType="submit" type="primary" className="w-full"
                                size="large">
                            ثبت
                        </Button>}
                </Form>
            </div>
        </div>
    );
};

export default EstOpinionForm;