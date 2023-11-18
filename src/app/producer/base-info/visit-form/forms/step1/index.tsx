import { ChevronDoubleLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, Divider, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import StepContext from '../../stete-manager/step-context';
import DataTable from './components/data-table';
import CreateModal from './components/create-modal';
import getPageRecordNumber from "../../../../../../../lib/getPageRecordNumber";
import useSWR from 'swr';
import { listFetcher } from '../../../../../../../lib/server/listFetcher';

export default function Index() {

    const processController = useContext(StepContext);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const defaultValueTable = {
        ...getPageRecordNumber()
    };

    const { data, isLoading, mutate, isValidating } = useSWR<{
        records: any[];
        count: number;
    }>(
        ["/ProducerMixTank/GetPage_Producer", defaultValueTable],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
    );

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        اطلاعات مخازن میکس یا بلندینگ ( 1 از 8 )
                    </Typography>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Button
                        className="flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        icon={<PlusIcon width={24} height={24} />}
                        onClick={showModal}
                    >
                        افزودن مخزن
                    </Button>
                    <Button
                        className="bg-gray-50 flex items-center justify-center"
                        size="large"
                        type="default"
                        htmlType="submit"
                        onClick={() => processController.dispatch({ type: "NEXT", stepNumber: 7 })}
                    >
                        <span className="flex">
                            صفحه بعد
                        </span>
                        <ChevronDoubleLeftIcon width={24} height={24} />
                    </Button>
                </div>
            </div >
            <Divider />
            <DataTable
                isValidating={isValidating}
                mutate={mutate}
                data={data}
                isLoading={isLoading}
            />
            <CreateModal
                mutate={mutate}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    )
}
