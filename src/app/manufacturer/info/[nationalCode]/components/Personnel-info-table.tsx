import { Divider, Table, Typography } from 'antd'
import React from 'react'
import { addIndexToData } from '../../../../../../lib/addIndexToData'
import { Employee } from '../../../../../../interfaces/producer'
import { listFetcher } from '../../../../../../lib/server/listFetcher'
import useSWR from "swr";
import { ColumnsType } from 'antd/es/table'


export default function PersonnelInfoTable({ params }: { params: { nationalCode: string } }) {

    const {
        data: employees,
        isLoading: ldEmployees
    } = useSWR<Employee[]>("/Producer/GetAllEmployee", (url) => listFetcher(url, {
        arg: {
            "nationalCode": params.nationalCode
        }
    }))



    const employeeColumns: ColumnsType<Employee> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "  نام و نام خانوادگی",
            dataIndex: "memberName",
            key: "2",
        },
        {
            title: "  کد ملی / کد اتباع",
            dataIndex: "memberNationalCode",
            key: "3",
        },
        {
            title: "سمت",
            dataIndex: "companyRoleName",
            key: "4"
        },
        {
            title: " تاریخ تولد",
            dataIndex: "ConfirmedRequestCode",
            key: "5",
        },

        {
            title: " شماره تماس",
            dataIndex: "call",
            key: "6",
        },
    ];


    return (
        <>
            <Divider />
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                اطلاعات کارکنان
            </Typography>
            <Table
                loading={ldEmployees}
                className="mt-8"
                columns={employeeColumns}
                dataSource={addIndexToData(employees, "Row")}
                pagination={false}
            />
        </>
    )
}
