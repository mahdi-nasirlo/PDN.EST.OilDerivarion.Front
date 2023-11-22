import {useForm} from 'antd/es/form/Form';
import React from 'react'
import useSWR from 'swr';
import FormBuilderFetcher from '../../../../../../../../lib/server/formBuilderFetcher';


export default function CreateForm() {

    const [form] = useForm();

    const { data, isLoading: loadingForm } = useSWR("/CategoryForm/GetData",
        (url: string) => FormBuilderFetcher(url, {
            arg: {
                group_ID: "31aefbf6-0e08-4044-8132-b3226253054f",
                groupKey: null,
                category_ID: "b491a1a1-443e-4a65-8d6d-c1d8ce259b6e",
                category_Key: null
            }
        })
    )

    return (
        <>
            {/*<FormBuilder items={data as any} loading={loadingForm} />*/}
        </>
    )
}