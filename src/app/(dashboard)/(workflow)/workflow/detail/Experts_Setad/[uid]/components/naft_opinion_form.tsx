import React, {useEffect} from 'react';
import {Divider, Form, Input} from "antd/lib";
import {CommentWorkflowSelectField} from "@/components/fields/commenct-workflow-select-field";
import {TestItemsMultipleSelectField} from "@/components/fields/test-items-multiple-select-field";
import {z} from "zod";
import {RequestPackageApi} from "../../../../../../../../constance/request-package";
import {Button} from "antd";
import useUiOpinionForm
    from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/hook/use-ui-opinion-form";

const EstOpinionForm = ({request, uid, visit_Type}: {
    request: z.infer<typeof RequestPackageApi.FinalResultList.item>,
    uid: string,
    visit_Type: number
}) => {

    const {
        displayTestItem,
        setDisplayTestItem,
        form,
        onFinish,
        add
    } = useUiOpinionForm(uid, request, visit_Type)

    useEffect(() => {
        setDisplayTestItem(request.Naft_Opinion_ID)
    }, [request])

    return (
        <div>
            <div className="my-12">
                <Divider orientation="left">
                    نماینده نفت
                </Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    disabled={visit_Type !== 1} layout="vertical"
                    initialValues={{samt_test_item: [], est_test_item: []}}>
                    <Form.Item
                        label="نظر نهایی"
                        name="naft_Opinion_ID"
                    >
                        <CommentWorkflowSelectField onChange={value => setDisplayTestItem(value)}/>
                    </Form.Item>
                    {displayTestItem == 3 && <Form.Item
                        label="فاکتور های آزمون"
                        name={"naft_test_item"}
                    >
                        <TestItemsMultipleSelectField/>
                    </Form.Item>}
                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="naft_opinion_description"
                        label="توضیحات"
                    >
                        <Input.TextArea
                            style={{height: 100, resize: "none"}}
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                    <Form.Item
                        label="آخرین ویرایش"
                        name="naft_result_modify_date_time"
                    >
                        <Input readOnly={true} disabled={true}/>
                    </Form.Item>
                    {visit_Type == 1 && <Button
                        type="primary"
                        className="w-full"
                        loading={add.isPending}
                        htmlType="submit"
                        size="large"
                    >
                        ثبت
                    </Button>}
                </Form>
            </div>
        </div>
    );
};

export default EstOpinionForm;