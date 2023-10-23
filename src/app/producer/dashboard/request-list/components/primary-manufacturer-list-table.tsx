import {Button, Space, Table, Typography} from "antd";
import React from "react";
import {ColumnsType} from "antd/es/table";
import {RequestList} from "../../../../../../interfaces/requestDetail";
import {addIndexToData} from "../../../../../../lib/addIndexToData";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import getPageRecordNumber from "../../../../../../lib/getPageRecordNumber";

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

    const {data: request, isLoading, mutate, isValidating} = useSWR<{ records: RequestList[], count: number }>(
        "/RequestMaster/GetPage_Producer",
        (url) =>
            listFetcher(url, {
                arg: getPageRecordNumber(),
            })
    );

    return (
        <div className="box-border w-full p-6 mt-8">
            <Typography className="text-right text-[16px] font-normal">
                لیست درخواست ها
            </Typography>
            <Table
                className="mt-8"
                loading={isLoading || isValidating}
                columns={columns}
                dataSource={addIndexToData(request?.records)}
                pagination={{
                    onChange: async (e) => {
                        await mutate(getPageRecordNumber(e))
                    },
                    pageSize: 10,
                    total: request?.count,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    defaultCurrent: 1,
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "16px 0",
                    },
                }}
            />
        </div>
    );
}
