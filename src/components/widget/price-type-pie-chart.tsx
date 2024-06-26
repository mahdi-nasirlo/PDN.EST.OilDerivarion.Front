"use client"

import React, { useEffect, useState } from 'react'
import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { useRequestPackageReport } from '@/hooks/request-package/use-request-package-report'
import { RequestPackageApi } from 'constance/request-package'


Chart.register(ArcElement, Tooltip, Legend)

interface TProps {
    className?: string
}

export default function PriceTypePieChart({ className }: TProps) {

    const [validData, setValidData] = useState<any>()

    const { data } = useRequestPackageReport({ report_Name: "paymentPie" })

    const select = () => {

        const validate = RequestPackageApi.report.paymentPie.safeParse(data?.data)

        if (validate.success) {

            const { data } = validate

            return setValidData([data[0].Type_1, data[0].Type_2, data[0].Type_3, data[0].Type_4])
        }

        return setValidData([])
    }

    useEffect(() => {
        console.log(data);

        select()
    }, [data])

    const chartData = {
        labels: [
            'هزینه بازدید',
            'هزینه پست',
            'هزینه انجام آزمایش',
            'هزینه صدور کد محصول',
        ],
        datasets: [
            {
                label: 'تعداد',
                data: validData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(255, 206, 86, 0.2)',
                // ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <>
            <Pie
                data={chartData}
                className={className}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    family: "IRANSansfanum"
                                }
                            }
                        },
                        title: {
                            font: { family: "IRANSansfanum" },
                        },
                        tooltip: {
                            textDirection: "rtl",
                            titleFont: {
                                family: "IRANSansfanum"
                            },
                            footerFont: {
                                family: "IRANSansfanum"
                            },
                            bodyFont: {
                                family: "IRANSansfanum"
                            }
                        },
                    },
                    responsive: true,
                    font: { family: "IRANSansfanum" },
                }} />
        </>
    )
}
