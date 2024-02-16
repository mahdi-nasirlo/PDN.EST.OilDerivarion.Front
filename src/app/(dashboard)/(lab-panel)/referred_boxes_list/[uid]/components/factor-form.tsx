import { ViewColumnsIcon } from '@heroicons/react/24/outline'
import { Form, Select } from 'antd/lib'
import React from 'react'
import CustomTable from "@/components/custom-table"

export default function FactorForm() {
    return <>
        <Form.Item labelCol={{ span: 24 }} className='w-full md:w-1/2' label="بطری">
            <Select placeholder="انتخاب کنید" />
        </Form.Item>
        <CustomTable
            data={{ records: [] }}
            columns={[
                { title: "#" },
                { title: "فاکتور" },
                { title: "وضعیت" },
                { title: "تعداد بطری" },
                { title: "عملیات" }
            ]}
            header={{
                text: "لیست فاکتور های آزمون",
                icon: <ViewColumnsIcon className="h-8" />
            }}
        />
    </>
}
