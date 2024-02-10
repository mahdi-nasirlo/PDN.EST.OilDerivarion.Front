"use client";

import React from "react";
import { z } from "zod";
import { ColumnsType } from "antd/es/table";
import useWorkflow from "@/components/workflow/workflow-data-list/hook/useWorkflow";
import { Spin } from "antd";
import WorkflowDescription from "@/components/workflow/workflow-description";
import WorkflowTable from "@/components/workflow/workflow-table";
import { workflowApi } from "constance/workflow";

const Index = (props: {
  stepKey?: string;
  loading?: boolean;
  extraColumns?: ColumnsType<any>;
  data?:
    | z.infer<typeof workflowApi.GetAllTask.response.shape.data>
    | undefined
    | null;
}) => {
  const stepKey = props.stepKey ? { stepKey: props.stepKey } : undefined;

  const { data, isFetching } = useWorkflow(stepKey);

  //@ts-ignore
  const finalData: z.infer<typeof workflowApi.GetAllTask.response.shape.data> =
    props.data ?? data;

  if (isFetching && !data) return <Spin />;

  return (
    <>
      <Spin spinning={isFetching || props.loading}>
        {/*{data?.step && (*/}
        {/*    <div className="flex items-center mb-4">*/}
        {/*        <Descriptions*/}
        {/*            className="text-right"*/}
        {/*        >*/}
        {/*            <Descriptions.Item span={2} label="مرحله">*/}
        {/*                {data.step[0]?.Step_Name}*/}
        {/*            </Descriptions.Item>*/}
        {/*            <Descriptions.Item span={2} label="نقش">*/}
        {/*                {data.step[0]?.Roles_of_authorized_approvers}*/}
        {/*            </Descriptions.Item>*/}
        {/*            <Descriptions.Item span={5} label="متن کمکی">*/}
        {/*                {data.step[0]?.Help_Text}*/}
        {/*            </Descriptions.Item>*/}
        {/*        </Descriptions>*/}
        {/*    </div>*/}
        {/*)}*/}
        {finalData?.tasks.Model && (
          <WorkflowDescription data={finalData.tasks.Model} />
        )}
        {finalData?.tasks.Table && (
          <WorkflowTable
            data={finalData.tasks.Table}
            extraColumns={props.extraColumns}
          />
        )}
      </Spin>
    </>
  );
};

export default Index;
