import { ViewColumnsIcon } from '@heroicons/react/24/outline'
import { Form, Select } from 'antd/lib'
import React from 'react'
import CustomTable from "@/components/custom-table"
import useBattleSelect from '../hook/use-battle-select'
import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

export default function FactorForm({ package_UID }: { package_UID: string }) {

    const { LabSampleList, Battle, setBattle, LabSampleTestItemList } = useBattleSelect({ package_UID })

    const columns: ColumnsType<any> = [
        {
            title: "#",
            dataIndex: "Row",
            key: "1"
        },
        {
            title: "فاکتور",
            dataIndex: "Name",
            key: '2'

        },
        { title: "وضعیت" },
        { title: "تعداد بطری" },
        { title: "عملیات" }
    ]


    return <>
        <Form.Item labelCol={{ span: 24 }} className='w-full md:w-1/2' label="بطری">
            <Select
                fieldNames={LabSampleList.fieldName}
                loading={LabSampleList.isFetching}
                options={LabSampleList.data}
                placeholder="انتخاب کنید"
                value={Battle}
                onChange={(e) => setBattle(e)}
            />
        </Form.Item>
        <Typography>
            {JSON.stringify(LabSampleTestItemList.data)}
        </Typography>
        <CustomTable
            data={{ records: LabSampleTestItemList.data }}
            columns={columns}
            header={{
                text: "لیست فاکتور های آزمون",
                icon: <ViewColumnsIcon className="h-8" />
            }}
        />
    </>
}
