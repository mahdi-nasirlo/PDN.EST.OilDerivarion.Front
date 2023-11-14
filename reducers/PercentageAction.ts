import {FormInstance} from "antd";

interface PercentAction {
    value: number | null;
    type: "one" | "two";
    form: FormInstance,
    inputNames: {
        percentOne: string;
        percentTwo: string;
    }
}

interface PercentState {
    percentOne: number;
    percentTwo: number;
}

const percentReducer = (state: PercentState, action: PercentAction): PercentState => {

    const {percentOne, percentTwo} = state;

    if (!percentOne && !percentTwo) {

        action.form.setFieldValue(action.inputNames.percentOne, 0)
        action.form.setFieldValue(action.inputNames.percentTwo, 100)

        return {percentOne: 0, percentTwo: 100};

    }
    switch (action.type) {
        case "one":

            action.form.setFieldsValue({
                [action.inputNames.percentOne]: action.value || 0,
                [action.inputNames.percentTwo]: 100 - (action.value || 0)
            })

            return {percentOne: action.value || 0, percentTwo: 100 - (action.value || 0),};
        case "two":

            action.form.setFieldsValue({
                [action.inputNames.percentOne]: 100 - (action.value || 0),
                [action.inputNames.percentTwo]: action.value || 0
            })

            return {percentOne: 100 - (action.value || 0), percentTwo: action.value || 0,};
        default:
            return state;
    }
};
export default percentReducer