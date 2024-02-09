import React, {useEffect} from 'react';
import {Form, Input} from "antd/lib";
import {CommentWorkflowSelectField} from "@/components/fields/commenct-workflow-select-field";
import {TestItemsMultipleSelectField} from "@/components/fields/test-items-multiple-select-field";
import {z} from "zod";
import {RequestPackageApi} from "../../../../../../../../constance/request-package";
import {Button} from "antd";
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
        add,
        onFinish
    } = useUiOpinionForm(uid, request)

    useEffect(() => {
        setDisplayTestItem(request.Samt_Opinion_ID)
    }, [request])

    return (
        <div>
            <div className="my-5">
                <Form
                    form={form}
                    onFinish={onFinish}
                    disabled={request.visit_Type !== 2 || add.isPending}
                    layout="vertical"
                >
                    <Form.Item
                        label="نظر نهایی"
                        name="Samt_Opinion_ID"
                    >
                        <CommentWorkflowSelectField onChange={value => setDisplayTestItem(value)}/>
                    </Form.Item>
                    {displayTestItem == 3 && <Form.Item
                        label="فاکتور های آزمون"
                        name={"samt_test_item"}
                    >
                        <TestItemsMultipleSelectField/>
                    </Form.Item>}
                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="samt_opinion_description"
                        label="توضیحات"
                    >
                        <Input.TextArea
                            style={{height: 100, resize: "none"}}
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                    <Form.Item
                        label="آخرین ویرایش"
                        name="samt_result_modify_date_time"
                    >
                        <Input readOnly={true} disabled={true}/>
                    </Form.Item>
                    {request.visit_Type == 2 && <Button
                        loading={add.isPending}
                        type="primary"
                        className="w-full"
                        size="large"
                        htmlType="submit"
                    >
                        ثبت
                    </Button>}
                </Form>
            </div>
        </div>
    );
};

export default EstOpinionForm;