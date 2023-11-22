import React from 'react';

export interface FormBuilderType {
    onSubmit: (arg: any) => void,
    initialValues: any
}

export const FormBuilderContext = React.createContext<FormBuilderType>({} as FormBuilderType)

interface FormBuilderProvider {
    children: React.ReactNode,
    onSubmit: (arg: any) => void,
    initialValues: any
}

export const FormBuilderProvider = (props: FormBuilderProvider) => {
    return (
        <FormBuilderContext.Provider value={{
            onSubmit: props.onSubmit,
            initialValues: props.initialValues
        }}>
            {props.children}
        </FormBuilderContext.Provider>
    );
};

export default FormBuilderProvider;