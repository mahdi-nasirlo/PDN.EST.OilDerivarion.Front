interface Next {
    type: "NEXT",
    stepNumber: number
}

interface Previous {
    type: "PREVIOUS",
}

interface GetStep {
    type: "GET_STEP",
    step: number,
    stepNumber: number
}

export type StepAction = Previous | Next | GetStep


const stepReducer = (value: number, action: StepAction) => {


    if (action.type === "NEXT" && value < action.stepNumber)
        return value + 1

    if (action.type === "PREVIOUS" && value > 0)
        return value - 1

    if (action.type === "GET_STEP" && action.stepNumber > value && value > 0)
        return action.step

    return value

}


export default stepReducer