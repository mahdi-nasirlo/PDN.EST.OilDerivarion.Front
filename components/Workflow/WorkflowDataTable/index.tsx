"use client";

import React from "react";
import useWorkflow from "./useWorkflow";
import {Typography} from "antd";

const Index = () => {
  const { columns, fetch } = useWorkflow();

  // const renderDes = () => {
  //   try {
  //     const step: Steps | undefined = fetch.data?.step
  //       ? fetch.data?.step[0]
  //       : null;

  //     return (
  //       <>
  //         <Descriptions className="text-right" title={step?.Name}>
  {
    /* <Descriptions.Item span={2} label="مرحله">
              {step?.Step_Name}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="نقش">
              {step?.Roles_of_authorized_approvers}
            </Descriptions.Item>
            <Descriptions.Item span={5} label="متن کمکی">
              {step?.Help_Text}
            </Descriptions.Item> */
  }
  //         </Descriptions>
  //       </>
  //     );
  //   } catch (e) {
  //     return <></>;
  //   }
  // };

  const dataTable = () => {
    // try {
    //   return (
    //     // <WorkflowDataViewer
    //     //   columns={columns}
    //     //   data={fetch.data?.tasks}
    //     //   loading={fetch.isLoading}
    //     // />
    //   );
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <>
      <div className="box-border w-full p-6">
        {fetch.data?.step && (
          <Typography className="text-right text-lg font-bold">
            {fetch.data?.step[0]?.Name}
          </Typography>
        )}

        {/* {renderDes()} */}
        {dataTable()}
      </div>
    </>
  );
};

export default Index;
