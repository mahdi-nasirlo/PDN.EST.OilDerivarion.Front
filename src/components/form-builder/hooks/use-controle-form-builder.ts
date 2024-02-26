import {z} from "zod";
import {formMakerApi} from "../../../constance/form-maker";
import {generalResponseZod} from "@/types/api-response";
import {useSetForm} from "@/hooks/form-maker/use-set-form";

const type = formMakerApi.Get

const useControlFormBuilder = (formData: z.infer<typeof type.formData>, categoryKey: string) => {

    const set = useSetForm(categoryKey)

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
    const onSetMany = async (data: any, formKey: string) => {

        const oldDataForm = oldData[formKey];

        if (Array.isArray(oldDataForm)) {

            oldData[formKey] = [...oldDataForm, data];

        } else {

            oldData[formKey] = [data];
        }

        await set.mutateAsync({form_Key: formKey, form_Data: JSON.stringify(oldData)})

    }

    const onUpdateMany = async (data: any, formKey: string, row: number) => {

        oldData[formKey][row - 1] = data

        await set.mutateAsync(data ? oldData : undefined);

    }

    const deleteFromMany = async (index: number, formKey: string): Promise<z.infer<typeof generalResponseZod> | undefined> => {

        const data = oldData[formKey]

        if (Array.isArray(data)) {

            if (index >= 0 && index < data.length) {

                data.splice(index, 1);

                if (Array.isArray(data) && data.length === 0) {
                    return await set.mutateAsync({form_Key: formKey, form_Data: null})
                }

                return await set.mutateAsync({form_Key: formKey, form_Data: JSON.stringify({[formKey]: data})});

            } else {
                console.error("Index out of bounds");
            }
        } else {
            console.error(`Data at formKey "${formKey}" is not an array`);
        }

    }

    const onSetOne = async (data: any, formKey: string) => {

        oldData[formKey] = data;

        await set.mutateAsync({form_Key: formKey, form_Data: JSON.stringify(oldData)})

    }

    return {
        // ...context,
        isLoading: set.isPending,
        onSetMany,
        deleteFromMany,
        onSetOne,
        onUpdateMany
    }
};

export default useControlFormBuilder;