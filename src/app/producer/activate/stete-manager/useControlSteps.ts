import { Dispatch, useReducer } from "react";
import stepReducer, {
  StepAction,
} from "../../dashboard/request/state-managment/step-reducer";

export interface ProcessType {
  step: number;
  dispatch: Dispatch<StepAction>;
}

function useControlSteps(): ProcessType {
  const [step, dispatch] = useReducer(stepReducer, 6);

  return { step, dispatch };
}

export default useControlSteps;
