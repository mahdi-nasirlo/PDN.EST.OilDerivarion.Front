import {useContext} from 'react';
import {FormBuilderContext} from "../provider/FormBuilderProvider";
import {z} from "zod";

const useControlFormBuilder = () => {

    const context = useContext(FormBuilderContext)

    const nonEmptyString = z.string().min(1).refine((val) => val !== null && val !== undefined, {
        message: "String must not be empty, null, or undefined",
    });

    const objectSchema = z.record(nonEmptyString);

    function validateValue(value: object): boolean {
        const result = objectSchema.safeParse(value);
        if (result.success) {
            return true;
        } else {

            const areAllKeysInvalid = Object.values(value).every(val => val === null || val === undefined || val === '');
            return !areAllKeysInvalid;
        }
    }

    // Assuming context.formData.data?.records is an object
    let oldData = context.formData?.data?.records ? (JSON?.parse(context.formData?.data?.records || {}) || {}) : {};

    oldData["__schema"] = context.formData?.data?.schema

    const onSetMany = (data: any, formKey: string) => {

        const oldDataForm = oldData[formKey];

        if (Array.isArray(oldDataForm)) {

            oldData[formKey] = [...oldDataForm, data];
        } else {

            oldData[formKey] = [data];
        }

        context.formData.onSet(validateValue(data) ? oldData : undefined);

    }

    const onUpdateMany = (data: any, formKey: string, row: number) => {

        oldData[formKey][row - 1] = data

        context.formData.onSet(validateValue(data) ? oldData : undefined);

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

    const onSetOne = (data: any, formKey: string) => {

        oldData[formKey] = data;

        context.formData.onSet(validateValue(data) ? oldData : undefined);

    }

    return {
        ...context,
        onSetMany,
        deleteFromMany,
        onSetOne,
        onUpdateMany
    }
};

export default useControlFormBuilder;