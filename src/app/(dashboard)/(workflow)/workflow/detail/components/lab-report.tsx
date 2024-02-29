import { Card } from '@/components/card'
import useLabReport from '@/hooks/request-package/use-lab-report'
import { Spin } from 'antd'
import { Descriptions } from 'antd/lib'
import React from 'react'

export default function LabResult({ package_UID }: { package_UID: string }) {

    const {
        data,
        isFetching
    } = useLabReport({ package_UID: package_UID })

    return (
        <Spin spinning={isFetching}>
            {data?.map(result => <>
                <Card
                    className='bg-gray-50'
                >
                    <Descriptions
                        column={4}
                        className='text-right text-secondary-500'
                        title={`${result.Sample_Name} _ ${result.Sample_Type_Value}`}
                    >
                        <Descriptions.Item span={2} label="عنوان آزمون">
                            {result.Name}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="استاندارد آزمون">
                            {result.Title}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="نتیجه آزمایش">
                            {result.Result_Test}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="حداکثر بازه قابل قبول">
                            {result.Result_Max_Accept}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="حداقل بازه قابل قبول">
                            {result.Result_Min_Accept}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="واحد تجدید پذیری">
                            {result.Result_Renew_Unit_FK}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="مقدار تجدید پذیری">
                            {result.Result_Renewable}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="تجدید پذیر">
                            {result.Result_Renewable}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label="توضیحات">
                            {result.Result_Desc}
                        </Descriptions.Item>
                        {!result.Is_Product && <>
                            <Descriptions.Item span={2} label="نام تامین کننده">
                                {result.Material_Supply_Name}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="کد ملی تامین کننده">
                                {result.Material_Supply_National_Code}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="ایرانکد">
                                {result.Material_Supply_Iran_Code}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="شماره اظهار نامه">
                                {result.Material_Import_Declaration_Number}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="در صد استفاده ماده اولیه">
                                {result.Material_Usage_Percentage}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="میزان مصرف کل برای یک واحد تولیدی(کیلوگرم)">
                                {result.Material_Unit_Consumption}
                            </Descriptions.Item>
                            <Descriptions.Item span={4} label="آدرس تامین کننده">
                                {result.Material_Supply_Address}
                            </Descriptions.Item>
                            <Descriptions.Item label="تعداد فاکتور آزمون">
                                {result.Test_Item_Count}
                            </Descriptions.Item>
                        </>}
                    </Descriptions>
                </Card>
            </>)}
        </Spin>
    )
}
