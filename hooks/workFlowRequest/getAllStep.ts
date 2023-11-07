import {Choice} from "../../interfaces/requestDetail";

export interface GetAllStep02 {
    taskId: string,
    userDescription: string,
    startTimePersian: string,
    currentStepStartTimePersian: string
}

export interface GetStep02 {
    mainMember: null,
    lab: null,
    detail: null,
    choices: Choice[],
    task: {
        processId: string,
        stepId: string,
        reference_ID: string,
        group_ID: string,
        step_Name: string,
        counting_position: number,
        userId: number
    }
}
