import React, { useEffect } from "react";
import { Divider, Form, Input } from "antd/lib";
import { CommentWorkflowSelectField } from "@/components/fields/commenct-workflow-select-field";
import { TestItemsMultipleSelectField } from "@/components/fields/test-items-multiple-select-field";
import { z } from "zod";
import { RequestPackageApi } from "../../../../../../../../constance/request-package";
import { Button } from "antd";
import useUiOpinionForm from "@/app/(dashboard)/(workflow)/workflow/detail/Experts_Setad/[uid]/hook/use-ui-opinion-form";

const EstOpinionForm = ({
  request,
  uid,
  visit_Type,
}: {
  request: z.infer<typeof RequestPackageApi.FinalResultList.item>;
  uid: string;
  visit_Type: number;
}) => {
  const { displayTestItem, setDisplayTestItem, form, add, onFinish } =
    useUiOpinionForm(uid, request, visit_Type);

  useEffect(() => {
    console.log(request);
    setDisplayTestItem(request.samt_Opinion_ID);
  }, [request]);

  return (
    <div>
      <div className="my-5">
        <Divider orientation="left">نماینده صمت</Divider>
        <Form
          form={form}
          onFinish={onFinish}
          disabled={visit_Type !== 2 || add.isPending}
          layout="vertical"
        >
          <Form.Item label="نظر نهایی" name="samt_Opinion_ID">
            <CommentWorkflowSelectField
              onChange={(value) => setDisplayTestItem(value)}
            />
          </Form.Item>
          {displayTestItem == 3 && (
            <Form.Item label="فاکتور های آزمون" name={"samt_test_item"}>
              <TestItemsMultipleSelectField />
            </Form.Item>
          )}
          <Form.Item
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="samt_opinion_description"
            label="توضیحات"
          >
            <Input.TextArea
              style={{ resize: "none" }}
              placeholder="وارد کنید"
            />
          </Form.Item>
          {request.samt_result_modify_date_time != "" && (
            <Form.Item label="آخرین ویرایش" name="samt_result_modify_date_time">
              <Input readOnly={true} disabled={true} />
            </Form.Item>
          )}

          {visit_Type == 2 && (
            <Button
              loading={add.isPending}
              type="primary"
              className="w-full"
              size="large"
              htmlType="submit"
            >
              ثبت
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default EstOpinionForm;
