"use client";

import React from "react";
import useControlSteps from "./stete-manager/useControlSteps";
import StepContext from "./stete-manager/step-context";
import Step1 from "./forms/step1";
import Step2 from "./forms/step2";
import Step3 from "./forms/step3";
import Step4 from "./forms/step4";
import Step5 from "./forms/step5";
// import Step6 from './forms/step6';
// import Step7 from './forms/step7';
// import Step8 from './forms/step8';

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
    // case 5:
    //     CurrentStep = <Step6 />
    //     break;
    // case 6:
    //     CurrentStep = <Step7 />
    //     break;
    // case 7:
    //     CurrentStep = <Step8 />
    //     break;
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
