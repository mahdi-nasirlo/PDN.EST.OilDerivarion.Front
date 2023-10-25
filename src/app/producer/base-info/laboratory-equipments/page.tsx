'use client'

import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Button, Divider, Form, Spin, Typography } from 'antd'
import EditForm from './components/edit-form'
import { listFetcher } from '../../../../../lib/server/listFetcher'
import useSWR from "swr";
import { useEffect, useState } from 'react'
import DisplayForm from './components/display-form'
import { useForm } from 'antd/es/form/Form'
import { SetProducerLab } from '../../../../../interfaces/Base-info'
import { mutationFetcher } from '../../../../../lib/server/mutationFetcher'
import useSWRMutation from "swr/mutation";


export default function Page() {

    const [isEditVisible, setIsEditVisible] = useState(true)

    const { data: ProducerLab, isLoading: ldProducerLab, mutate } = useSWR(
        ["/Company/GetProducerLab"],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))


    const showEdit = () => {
        mutate()
        setIsEditVisible(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    const notDisplayForm = () => {
        mutate()
        setIsEditVisible(true);
    };

    // ادیت

    const [form] = useForm();

    useEffect(() => {

        form.setFieldsValue(ProducerLab)

    }, [ProducerLab])


    const { trigger, isMutating } = useSWRMutation("/Company/SetProducerLab", mutationFetcher)

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
                <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>
                    تجهیزات آزمایشگاهی
                </Typography>
                <div className='max-md:w-full'>
                    {isEditVisible &&
                        <Button
                            className="max-md:w-full flex justify-center items-center gap-2"
                            size="large"
                            type="primary"
                            htmlType="submit"
                            onClick={showEdit}
                        >
                            <PencilSquareIcon width={24} height={24} />
                            <span className="flex">
                                ویرایش
                            </span>
                        </Button>
                    }
                    {!isEditVisible &&
                        <div className='flex gap-3'>
                            <Button
                                className="w-full bg-gray-100 text-warmGray-500"
                                size="large"
                                htmlType="submit"
                                onClick={notDisplayForm}
                                loading={isMutating}
                            >
                                انصراف
                            </Button>
                            <Button
                                className="max-md:w-full"
                                size="large"
                                type="primary"
                                htmlType="submit"
                                onClick={() => form.submit()}
                                loading={isMutating}
                            >
                                ثبت
                            </Button>
                        </div>
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
                    <Form layout="vertical" form={form} onFinish={onSubmitFinish}>
                        <EditForm form={form} data={ProducerLab} />
                    </Form>
                </Spin>
            }
        </>
    )
}
