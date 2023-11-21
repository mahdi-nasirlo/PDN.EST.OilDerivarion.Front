"use client";

import stepReducer, {StepAction,} from "@/app/producer/dashboard/request/state-managment/step-reducer";
import {Dispatch, useReducer} from "react";

export interface ProcessType {
  step: number;
  dispatch: Dispatch<StepAction>;
}

function useControlSteps(): ProcessType {
  const [step, dispatch] = useReducer(stepReducer, 6);

  return {step, dispatch};
}

export default useControlSteps;
