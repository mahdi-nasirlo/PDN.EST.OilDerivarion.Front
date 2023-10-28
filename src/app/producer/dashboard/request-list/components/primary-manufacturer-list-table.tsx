import {Button, Space, Typography} from "antd";
import React, {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {RequestList} from "../../../../../../interfaces/requestDetail";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import getPageRecordNumber from "../../../../../../lib/getPageRecordNumber";
import CustomeTable from "../../../../../../components/CustomeTable";

export default function PrimaryManufacturerListTable() {
    const router = useRouter();

    const columns: ColumnsType<RequestList> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام فرآیند",
            dataIndex: "ProcessDescription",
            key: "2",
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "CreateDate",
            key: "3",
        },
        {
            title: "نام شرکت",
            dataIndex: "CompanyName",
            key: "4",
        },
        {
            title: "روش تولید",
            dataIndex: "ProductionMethodName",
            key: "5",
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: "right",
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className={"text-secondary-500 font-bold"}
                        onClick={() => {
                            router.push(`/producer/dashboard/request-detail/${record.Uid}`);
                            console.log(record.Uid);
                        }}
                    >
                        مشاهده اطلاعات
                    </Button>
                </Space>
            ),
        },
    ];

    const [data, setData] = useState(getPageRecordNumber())

    const {data: request, isLoading, mutate, isValidating} = useSWR<{ records: RequestList[], count: number }>(
        ["/RequestMaster/GetPage_Producer", data],
        ([url, arg]: [url: string, arg: any]) =>
            listFetcher(url, {
                arg,
            })
    );

    return (
        <div className="box-border w-full p-6 mt-8">
            <Typography className="text-right text-[16px] font-normal">
                لیست درخواست ها
            </Typography>
            <CustomeTable
                columns={columns}
                setInitialData={setData}
                isLoading={isLoading || isValidating}
                data={request}
            />
        </div>
    );
}
