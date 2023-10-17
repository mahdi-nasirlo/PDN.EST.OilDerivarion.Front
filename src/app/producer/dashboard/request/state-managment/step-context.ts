import React from "react";
import {ControllerProcessType} from "@/app/producer/dashboard/request/state-managment/useControlProcess";


const StepContext = React.createContext<ControllerProcessType>({} as ControllerProcessType)

export default StepContext