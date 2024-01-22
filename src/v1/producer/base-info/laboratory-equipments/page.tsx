'use client'

import { Button, Divider, Form, Spin, Typography } from 'antd'
import EditForm from './components/edit-form/edit-form'
import { listFetcher } from '../../../../../lib/server/listFetcher'
import useSWR from "swr";
import { useEffect, useState } from 'react'
import DisplayForm from './components/display/display-form'
import ButtonDisplay from './components/display/Button-display'
import { useForm } from 'antd/es/form/Form';
import { mutationFetcher } from '../../../../../lib/server/mutationFetcher';
import { SetProducerLab } from '../../../../../interfaces/Base-info';
import useSWRMutation from "swr/mutation";
import ButtonEdit from './components/edit-form/button-edit';


export default function Page() {

    const [isEditVisible, setIsEditVisible] = useState(true)

    const { data: ProducerLab, isLoading: ldProducerLab, mutate } = useSWR(
        ["/Producer/GetLab"],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))


    // ادیت


    const [form] = useForm();

    useEffect(() => {

        form.setFieldsValue(ProducerLab)

    }, [ProducerLab])


    const { trigger, isMutating } = useSWRMutation("/Producer/SetLab", mutationFetcher)

    const onSubmitFinish = async (values: SetProducerLab) => {

        const res = await trigger(values);

        await mutate();
        if (res) {

            setIsEditVisible(true);
        }
    };


    return (
        <>
            <div className="flex justify-between items-center">
                <Typography.Title level={5} className="text-gray-901 text-right">
                    تجهیزات آزمایشگاهی
                </Typography.Title>
                <div className='max-md:w-full'>
                    {isEditVisible && <ButtonDisplay setIsEditVisible={setIsEditVisible} mutate={mutate} />}

                    {!isEditVisible &&
                        <ButtonEdit
                            form={form}
                            mutate={mutate}
                            isMutating={isMutating}
                            setIsEditVisible={setIsEditVisible}
                        />
                    }
                </div>
            </div>
            <Divider />
            {isEditVisible &&
                <DisplayForm
                    data={ProducerLab}
                    isLoading={ldProducerLab}
                />
            }
            {!isEditVisible &&
                <Spin spinning={isMutating || ldProducerLab}>
                    <Form layout="vertical" form={form} onFinish={onSubmitFinish} >
                        <EditForm form={form} data={ProducerLab} />
                    </Form>
                </Spin >
            }
        </>
    )
}
