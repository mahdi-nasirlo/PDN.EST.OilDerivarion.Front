"use client"

import React from 'react'
import FormBuilder from '../../../../../../../../components/FormBuilder';
import useSWR from 'swr';
import FormBuilderFetcher from '../../../../../../../../lib/server/formBuilderFetcher';

export default function CreateModal() {


    const { data, isLoading: loadingForm } = useSWR("/CategoryForm/GetData",
        (url: string) => FormBuilderFetcher(url, {
            arg: {
                group_ID: "31aefbf6-0e08-4044-8132-b3226253054f",
                groupKey: null,
                category_ID: "43ed033a-e22d-4ad8-975a-2978db10b6db",
                category_Key: null
            }
        })
    )

    return (
        <>
            <FormBuilder items={data as any} loading={loadingForm}/>
        </>
    )
}
