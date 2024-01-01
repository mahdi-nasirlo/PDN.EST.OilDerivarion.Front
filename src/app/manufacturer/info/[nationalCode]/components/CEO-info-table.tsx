import { Divider, Table, Typography } from 'antd'
import React from 'react'
import { addIndexToData } from '../../../../../../lib/addIndexToData'
import { listFetcher } from '../../../../../../lib/server/listFetcher'
import { ColumnsType } from 'antd/es/table'
import { Ceo } from '../../../../../../interfaces/producer'
import useSWR from "swr";


export default function CEOInfoTable({ params }: { params: { nationalCode: string } }) {

    const {
        data: ceo,
        isLoading: ldCeo
    } = useSWR<Ceo[]>("/Producer/GetAllMember", (url) => listFetcher(url, {
        arg: {
            "nationalCode": params.nationalCode
        }
    }))

    const ceoColumns: ColumnsType<Ceo> = [
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
            title: "  شماره ملی / کد اتباع",
            dataIndex: "memberNationalCode",
            key: "3",
        },
        {
            title: " تاریخ تولد   ",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
        },
        {
            title: " سمت",
            dataIndex: "companyRoleName",
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
                اطلاعات اعضای هیئت مدیره و مدیرعامل
            </Typography>
            <Table
                className="mt-8"
                loading={ldCeo}
                columns={ceoColumns}
                dataSource={addIndexToData(ceo)}
                pagination={false}
            />
        </>
    )
}
