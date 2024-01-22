"use client";


import { Dispatch, useReducer } from "react";
import stepReducer, { StepAction } from "v1/producer/dashboard/request/state-managment/step-reducer";

export interface ProcessType {
  step: number;
  dispatch: Dispatch<StepAction>;
}

function useControlSteps(): ProcessType {
  const [step, dispatch] = useReducer(stepReducer, 0);

  return { step, dispatch };
}

export default useControlSteps;
