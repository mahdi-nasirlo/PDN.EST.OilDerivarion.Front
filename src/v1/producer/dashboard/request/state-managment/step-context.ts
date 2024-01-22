import React from "react";
import { ControllerProcessType } from "./useControlProcess";


const StepContext = React.createContext<ControllerProcessType>({} as ControllerProcessType)

export default StepContext