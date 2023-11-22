import React from 'react';
import {ReturnedTypeFormRequest} from "../hooks/useFormRequest";

export interface FormBuilderType {
    initialValues: any,
    type: "one" | "many",
    formData: ReturnedTypeFormRequest
}

export const FormBuilderContext = React.createContext<FormBuilderType>({} as FormBuilderType)

interface FormBuilderProvider {
    children: React.ReactNode,
    initialValues: any,
    type: "one" | "many",
    formData: ReturnedTypeFormRequest
}

export const FormBuilderProvider = (props: FormBuilderProvider) => {
    return (
        <FormBuilderContext.Provider value={{
            initialValues: props.initialValues,
            type: props.type,
            formData: props.formData
        }}>
            {props.children}
        </FormBuilderContext.Provider>
    );
};

export default FormBuilderProvider;