import {PlusOutlined} from '@ant-design/icons'
import {ArchiveBoxArrowDownIcon} from '@heroicons/react/24/outline'
import {Button, Form, Select, Spin, Typography} from 'antd'
import React from 'react'
import {useValidation} from "@/hooks/use-validation";
import {materialApi} from "../../../../constance/material";
import {productMethods} from "../../../../constance/product-method";
import {useRequestPackagePartAdd} from "@/hooks/material/use-request-package-part-add";

export default function FirstCard({package_UID}: { package_UID?: string }) {

    const addPart = useRequestPackagePartAdd(package_UID)

    const [form, rules] = useValidation(materialApi.RequestPackagePartAdd.type)

    const handleSubmit = async (data: any) => {
        const res = await addPart.mutateAsync(data)
        if (res.success)
            form.resetFields()
    }

    return (
        <>
            <Spin
                className="min-h-[480px]"
                spinning={addPart.isPending}
            >
                <div
                    className='min-h-[520px] border-2 border-dashed border-primary-500 p-4 rounded-2xl flex flex-col justify-between space-y-4'
                >
                    <Typography className="font-semibold text-lg">افزودن پکیج</Typography>
                    <ArchiveBoxArrowDownIcon className='mx-auto w-[105px] h-[105px] text-gray-700'/>
                    <Form form={form} onFinish={handleSubmit} layout="vertical" className="w-full">
                        <Form.Item
                            label="روش تولید"
                            name="part_Type"
                            required={false}
                            rules={[rules]}
                        >
                            <Select
                                options={productMethods}
                                placeholder="انتخاب کنید"
                                size="large"
                                className="w-full"
                            />
                        </Form.Item>
                        <Button
                            size="large"
                            htmlType="submit"
                            type="primary"
                            className="w-full flex items-center justify-center"
                            icon={<PlusOutlined width={16} height={16}/>}
                        >
                            افزودن پکیج
                        </Button>
                    </Form>
                </div>
            </Spin>
        </>
    )
}
