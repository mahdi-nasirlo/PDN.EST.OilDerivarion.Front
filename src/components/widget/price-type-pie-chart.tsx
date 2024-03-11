"use client"

import React from 'react'
import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { useRequestPackageReport } from '@/hooks/request-package/use-request-package-report'


Chart.register(ArcElement, Tooltip, Legend)

interface TProps {
    className?: string
}

export default function PriceTypePieChart({ className }: TProps) {

    const { data } = useRequestPackageReport({ report_Name: "paymentPie" })

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
                data: data,
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
