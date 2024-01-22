"use client";

import React from "react";
import { ProcessType } from "./useControlSteps";

const StepContext = React.createContext<ProcessType>({} as ProcessType);

export default StepContext;
