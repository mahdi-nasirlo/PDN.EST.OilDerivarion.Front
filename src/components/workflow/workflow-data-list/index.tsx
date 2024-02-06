"use client";

import React from "react";
import {z} from "zod";
import {ColumnsType} from "antd/es/table";
import useWorkflow from "@/components/workflow/workflow-data-list/hook/useWorkflow";
import {Spin} from "antd";
import WorkflowDescription from "@/components/workflow/workflow-description";
import WorkflowTable from "@/components/workflow/workflow-table";

const PropsType = z.object({
    stepKey: z.string(),
});

const Index = (
  props: z.infer<typeof PropsType> & { extraColumns?: ColumnsType<any> }
) => {

    const {data, isFetching} = useWorkflow({stepKey: props.stepKey});

    if (isFetching && !data) return <Spin/>;

    return (
        <>
            <Spin spinning={isFetching}>
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
                {data?.tasks.Model && <WorkflowDescription data={data.tasks.Model}/>}
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
