import {useContext} from 'react';
import {FormBuilderContext} from "../provider/FormBuilderProvider";

const useControlFormBuilder = () => {

    const context = useContext(FormBuilderContext)

    // Assuming context.formData.data?.records is an object
    const oldData = JSON.parse(context.formData.data?.records) || {};

    const onSetMany = (data: any, formKey: string) => {

        const oldDataForm = oldData[formKey];

        if (Array.isArray(oldDataForm)) {

            oldData[formKey] = [...oldDataForm, data];
        } else {

            oldData[formKey] = [data];
        }

        context.formData.onSet(oldData);

    }

    const deleteFromMany = (index: number, formKey: string) => {

        const oldDataForm = oldData[formKey];

        if (Array.isArray(oldDataForm)) {
            
            if (index >= 0 && index < oldDataForm.length) {

                oldDataForm.splice(index, 1);

                context.formData.onSet({...oldData});
            } else {
                console.error("Index out of bounds");
            }
        } else {
            console.error(`Data at formKey "${formKey}" is not an array`);
        }

    }

    return {
        ...context,
        onSetMany,
        deleteFromMany
    }
};

export default useControlFormBuilder;