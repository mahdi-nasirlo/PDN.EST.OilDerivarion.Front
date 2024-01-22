"use client";

import React from "react";
import { Steps } from "antd";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";
import useControlProcess from "./state-managment/useControlProcess";
import StepContext from "./state-managment/step-context";

function Page() {
  const processController = useControlProcess();

  let CurrentStep;

  switch (processController.step) {
    case 0:
      CurrentStep = <Step1 />;
      break;
    case 1:
      CurrentStep = <Step2 />;
      break;
    case 2:
      CurrentStep = <Step3 />;
      break;
    case 3:
      CurrentStep = <Step4 />;
      break;

    case 4:
      CurrentStep = <Step5 />;
      break;


    default:
      CurrentStep = <></>;
  }

  return (
    <>
      <Steps
        // progressDot={progressDot}
        current={processController.step}
        // onChange={onChange}
        className="pb-0 lg:pb-4"
        items={[
          {
            title: "فرآیند تولید",
            description: "شرح فرایند",
          },
          {
            title: "فرمولاسیون",
            description: "تولید محصول",
          },
          {
            title: "محصول نهایی",
            description: "انتخاب محصول نهایی",
          },
          {
            title: "تایید اطلاعات",
            description: "اطلاعات تولید کننده",
          },
          {
            title: "سبد درخواست",
            description: "سبد درخواست نهایی",
          },
        ]}
      />

      <div className="box-border w-full mt-4 p-6">
        <StepContext.Provider value={processController}>
          {CurrentStep}
        </StepContext.Provider>
      </div>
    </>
  );
}

export default Page;
