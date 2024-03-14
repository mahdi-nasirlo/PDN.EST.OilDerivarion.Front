"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { ArcElement, Chart, Legend, Tooltip, BarElement, LogarithmicScale, CategoryScale, LinearScale } from "chart.js"
import { useRequestPackageReport } from '@/hooks/request-package/use-request-package-report'
import { RequestPackageApi } from 'constance/request-package'
// import { draw } from "patternomaly";

Chart.register(ArcElement, Tooltip, Legend, BarElement, LogarithmicScale, CategoryScale, LinearScale)



interface TProps {
    className?: string
}

export default function ProductCodeBarChart({ className }: TProps) {

    const [validData, setValidData] = useState<any>()

    const [titles, setTitle] = useState<any>()

    const { data } = useRequestPackageReport({ report_Name: "productcode" })

    const select = () => {

        const validate = RequestPackageApi.report.productcode.safeParse(data?.data)

        if (validate.success) {

            const { data } = validate

            setTitle(data.map(item => item.Product_Name))

            return setValidData(data.map(item => item.Tedad))
        }

        setTitle([])

        return setValidData([])
    }

    useEffect(() => {
        select()
    }, [data])


    return (
        <>
            <Bar
                className={className}
                options={{
                    plugins: {
                        subtitle: {
                            font: {
                                family: "IRANSansfanum",
                            }
                        },
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
                    scales: {
                        screenY: {
                            type: "logarithmic",
                            position: "right",
                        }
                    }
                }}
                data={{
                    labels: titles,
                    datasets: [{
                        label: "محصول",
                        data: validData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                }} />

        </>
    )
}
