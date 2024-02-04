"use client";

import React from "react";
import useWorkflow from "@/components/Workflow/workflow-data-list/hook/useWorkflow";
import { z } from "zod";
import { Descriptions, Spin, Typography } from "antd";
import WorkflowDescription from "@/components/Workflow/workflow-description";
import WorkflowTable from "@/components/Workflow/workflow-table";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import { ColumnsType } from "antd/es/table";

const PropsType = z.object({
  apiUrl: z.string(),
});

const Index = (
  props: z.infer<typeof PropsType> & { extraColumns?: ColumnsType<any> }
) => {
  const { data, isFetching } = useWorkflow(props.apiUrl);

  if (isFetching && !data) return <Spin />;

  return (
    <>
      <Spin spinning={isFetching}>
        {data?.step && (
          <div className="flex items-center mb-4">
            <Descriptions
              className="text-right"
              title={
                <div className="flex items-center">
                  <RectangleGroupIcon className="w-8 text-gray-800" />
                  <Typography className="text-right text-lg font-bold mr-2">
                    {data?.step[0]?.Name}
                  </Typography>
                </div>
              }
            >
              <Descriptions.Item span={2} label="مرحله">
                {data.step[0]?.Step_Name}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="نقش">
                {data.step[0]?.Roles_of_authorized_approvers}
              </Descriptions.Item>
              <Descriptions.Item span={5} label="متن کمکی">
                {data.step[0]?.Help_Text}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
        {data?.tasks.Model && <WorkflowDescription data={data.tasks.Model} />}
        {data?.tasks.Table && (
          <WorkflowTable
            data={data.tasks.Table}
            extraColumns={props.extraColumns}
          />
        )}
      </Spin>
    </>
  );
};

export default Index;
