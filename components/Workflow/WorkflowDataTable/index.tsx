"use client";

import React from "react";
import CustomTable from "../../CustomeTable";
import useWorkflow from "./useWorkflow";
import {Steps} from "../../../interfaces/steps";
import {Descriptions} from "antd";

const Index = () => {
  const { columns, fetch } = useWorkflow();

  const renderDes = () => {
    try {
      const step: Steps | undefined = fetch.data?.step
        ? fetch.data?.step[0]
        : null;

      return (
        <>
          <Descriptions className="text-right" title={step?.Name}>
            <Descriptions.Item span={2} label="مرحله">
              {step?.Step_Name}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="نقش">
              {step?.Roles_of_authorized_approvers}
            </Descriptions.Item>
            <Descriptions.Item span={5} label="متن کمکی">
              {step?.Help_Text}
            </Descriptions.Item>
          </Descriptions>
        </>
      );
    } catch (e) {
      return <></>;
    }
  };

  console.log(fetch.data);

  return (
    <>
      <div className="box-border w-full p-6">
        {renderDes()}
        <CustomTable
          columns={columns}
          setInitialData={fetch.setInitialData}
          data={{ records: fetch.data?.tasks, count: fetch.data?.length || 0 }}
          isLoading={fetch.isLoading}
        />
      </div>
    </>
  );
};

export default Index;
