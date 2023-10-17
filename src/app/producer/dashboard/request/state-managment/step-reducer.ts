interface Next {
    type: "NEXT",
    stepNumber: number
}

interface Previous {
    type: "PREVIOUS",
}

export type StepAction = Previous | Next


const stepReducer = (value: number, action: StepAction) => {

    if (action.type === "NEXT" && value < action.stepNumber)
        return value + 1

    return value

}

export default stepReducer