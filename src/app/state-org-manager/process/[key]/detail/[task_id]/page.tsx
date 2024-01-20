"use client";

import React, {useState} from 'react'
import {Button, Divider, Spin, Typography} from 'antd';
import PrimaryRequestsDetailsTable from './components/primary-requests-details-table';
import PrimaryRequestsDetailsForm from './components/primary-requests-details-form';
import PrimaryRequestsDetailsModalSubmit from './components/primary-requests-details-modal-submit';
import PrimaryRequestsDetailsModalCancel from './components/primary-requests-details-modal-cancel';
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {listFetcher} from "../../../../../../../lib/server/listFetcher";
import {Choice, Get_ExeManager} from "../../../../../../../interfaces/requestDetail";
import {mutationFetcher} from "../../../../../../../lib/server/mutationFetcher";

export default function Page({params}: { params: { key: string, task_id: string, } }) {

    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleCancel, setModalVisibleCancel] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const showModalCancel = () => {
        setModalVisibleCancel(true);
    };

    const {data, isLoading} = useSWR<Get_ExeManager>("/RequestWorkFlow/GetAllChoise", url =>
        listFetcher(url, {
            arg: {
                "uid": params.task_id,
                "stepKey": params.key
            }
        })
    )

    const {trigger, isMutating} = useSWRMutation("/RequestWorkFlow/ChangeStep", mutationFetcher)

    const changeStep = async (choice: Choice) => {
        await trigger({
            taskId: params.task_id,
            stepKey: params.key,
            choiceKey: choice.choice_Key,
            description: "string"
        })
    }

    return (
        <>
            <div className="box-border w-full p-6">
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را تایید نمایید.
                </Typography>

                <Divider/>
                <PrimaryRequestsDetailsForm task_id={params.task_id} step_key={params.key}/>
                <PrimaryRequestsDetailsTable/>
                <Divider/>
                <Spin spinning={isLoading}>
                    <div className='flex gap-6'>
                        {data?.choices?.map((choice) => <>
                            <Button loading={isMutating} type="primary" className="w-full"
                                    onClick={() => changeStep(choice)}>{choice.label}
                            </Button>
                        </>)}
                    </div>
                </Spin>

                <PrimaryRequestsDetailsModalSubmit modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                <PrimaryRequestsDetailsModalCancel modalVisibleCancel={modalVisibleCancel}
                                                   setModalVisibleCancel={setModalVisibleCancel}/>
            </div>
        </>
    )
}
