import {z} from "zod";
import {formMakerApi} from "../../../constance/form-maker";
import useFormRequest from "@/components/form-builder/hooks/use-form-request";

const type = formMakerApi.Get

const useControlFormBuilder = (schema: z.infer<typeof type.formSchema>, formData: z.infer<typeof type.formData>, categoryKey: string) => {

    const {set} = useFormRequest(categoryKey)

    const oldData: z.infer<typeof type.formData> = formData || {}

    // const nonEmptyString = z.string().min(1).refine((val) => val !== null && val !== undefined, {
    //     message: "String must not be empty, null, or undefined",
    // });
    //
    // const objectSchema = z.record(nonEmptyString);
    //
    // function validateValue(value: object): boolean {
    //     const result = objectSchema.safeParse(value);
    //     if (result.success) {
    //         return true;
    //     } else {
    //
    //         const areAllKeysInvalid = Object.values(value).every(val => val === null || val === undefined || val === '');
    //         return !areAllKeysInvalid;
    //     }
    // }
    //
    // // Assuming context.formData.data?.records is an object

    //
    // const addSchema = () => oldData["__schema"] = context.formData?.data?.schema
    //
    // const deleteSchema = () => oldData.delete["__schema"]
    //
    // const handleSchema = (data: any) => {
    //     if (data) addSchema()
    //     else deleteSchema()
    // }
    //
    // const onSetMany = (data: any, formKey: string) => {
    //
    //     const oldDataForm = oldData[formKey];
    //
    //     handleSchema(data)
    //
    //     if (Array.isArray(oldDataForm)) {
    //
    //         oldData[formKey] = [...oldDataForm, data];
    //     } else {
    //
    //         oldData[formKey] = [data];
    //     }
    //
    //     context.formData.onSet(validateValue(data) ? oldData : undefined);
    //
    // }
    //
    // const onUpdateMany = (data: any, formKey: string, row: number) => {
    //
    //     handleSchema(data)
    //
    //     oldData[formKey][row - 1] = data
    //
    //     context.formData.onSet(validateValue(data) ? oldData : undefined);
    //
    // }
    //
    // const deleteFromMany = (index: number, formKey: string) => {
    //
    //     const oldDataForm = oldData[formKey];
    //
    //     if (Array.isArray(oldDataForm)) {
    //
    //         if (index >= 0 && index < oldDataForm.length) {
    //
    //             oldDataForm.splice(index, 1);
    //
    //             if (Array.isArray(oldDataForm) && oldDataForm.length === 0) {
    //                 return context.formData.onSet(null)
    //             }
    //
    //             context.formData.onSet({...oldData});
    //         } else {
    //             console.error("Index out of bounds");
    //         }
    //     } else {
    //         console.error(`Data at formKey "${formKey}" is not an array`);
    //     }
    //
    // }
    //
    const onSetOne = async (data: any, formKey: string) => {

        oldData[formKey] = data;

        await set.mutateAsync(oldData)

    }

    return {
        // ...context,
        // onSetMany,
        // deleteFromMany,
        onSetOne,
        // onUpdateMany
    }
};

export default useControlFormBuilder;