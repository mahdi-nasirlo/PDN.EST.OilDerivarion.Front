"use client"

import React, {useState} from 'react';
import {Switch} from "antd";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

interface PropsType {
    isActive: boolean,
    uid: string,
    url: string
}

const ChangeStatus = (props: PropsType) => {

    const {trigger, isMutating} = useSWRMutation(props.url ? props.url : "", mutationFetcher)

    const [value, setValue] = useState(props.isActive)

    const handleChange = async (e: boolean) => {

        const res = await trigger({
            uid: props.uid,
            isActive: props.isActive
        })

        setValue(e)

        if (!res) {

            setValue(!e)

        }

    }

    return (
        <Switch checked={value} onChange={handleChange}/>
    );
};

export default ChangeStatus;