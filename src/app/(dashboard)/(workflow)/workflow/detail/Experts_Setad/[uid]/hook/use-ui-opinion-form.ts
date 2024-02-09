import {useEffect, useState} from 'react';
import {useForm} from "antd/lib/form/Form";
import useFinalResultAdd from "@/hooks/request-package/use-final-result-add";
import {z} from "zod";
import {RequestPackageApi} from "../../../../../../../../constance/request-package";

const useUiOpinionForm = (package_UID: string, request: z.infer<typeof RequestPackageApi.FinalResultList.item>) => {

    const add = useFinalResultAdd()

    const [displayTestItem, setDisplayTestItem] = useState<number | boolean>(false)

    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue(request)
    }, [request])

    const onFinish = async (value: z.infer<typeof add.type>) => {

        const res = await add.mutateAsync({
            ...value,
            package_UID,
            product_UID: request.product_uid as string,
            visit_Type: request.visit_Type as number,
        })

    }

    return {displayTestItem, setDisplayTestItem, form, onFinish, add}
};

export default useUiOpinionForm;