"use client";

import React from "react";
import useControlSteps from "./stete-manager/useControlSteps";
import StepContext from "./stete-manager/step-context";
import Step1 from "../container-info/page";
import Step2 from "../container-product/page";
import Step3 from "../ractore-info/page";
import Step4 from "../slice-produce/page";
import Step5 from "../distillation-tower/page";
import Step6 from '../ractore-prompter/page';
import Step7 from '../sweetening/page';
import Step8 from '../facility-control-room/page';

function Page() {
  const processController = useControlSteps();

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
    case 5:
      CurrentStep = <Step6 />
      break;
    case 6:
      CurrentStep = <Step7 />
      break;
    case 7:
      CurrentStep = <Step8 />
      break;
    default:
      CurrentStep = <></>;
  }

  return (
    <>
      {/* <div className="box-border w-full mt-4 p-6"> */}
      <StepContext.Provider value={processController}>
        {CurrentStep}
      </StepContext.Provider>
      {/* </div> */}
    </>
  );
}

export default Page;
