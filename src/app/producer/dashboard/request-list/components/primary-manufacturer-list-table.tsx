import {Space, Table, Typography} from 'antd'
import Link from 'next/link';
import React from 'react'
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import {GetPage_ExeManager} from "../../../../../../interfaces/producer";

export default function PrimaryManufacturerListTable() {

    const {
        data,
        isLoading,
    } = useSWR<GetPage_ExeManager>("/Producer/GetPage_ExeManager", (url) => listFetcher(url, {
        arg: {
            "fromRecord": 0,
            "selectRecord": 100000
        }
    }))

// : ColumnsType<DataType>
    const columns = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام محصول",
            dataIndex: "ProductName",
            key: "2",
        },
        {
            title: "کد رهگیری",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "کد درخواست تایید شده",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "DateRegistration",
            key: "5",
        },
        {
            title: "وضعیت فعالیت",
            dataIndex: "ActivityStatus",
            key: "6",
            // render: (_, {ActivityStatus}) => (
            //     <>
            //         {ActivityStatus.map((activityStatus) => {
            //             let color;
            //             switch (activityStatus) {
            //                 case 'دریافت استاندارد':
            //                     color = 'green';
            //                     break;
            //                 case 'عدم دریافت استاندارد':
            //                     color = 'red';
            //                     break;
            //                 case 'در حال آزمایش':
            //                     color = 'yellow';
            //                     break;
            //                 case 'loser':
            //                     color = 'volcano';
            //                     break;
            //                 default:
            //                     color = 'geekblue'; // Default color if none of the conditions match
            //                     break;
            //             }
            //
            //             return (
            //                 <Tag color={color} key={activityStatus}>
            //                     {activityStatus.toUpperCase()}
            //                 </Tag>
            //             );
            //         })}
            //
            //     </>
            // ),
        },

        {
            title: "جزئیات",
            key: "جزئیات",
            render: () => (
                <Space size="middle">
                    <Link href={""} className="action-btn-delete">
                        حذف
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div className="box-border w-full p-6 mt-8">
            <Typography className="text-right text-[16px] font-normal">لیست درخواست ها</Typography>
            <Table
                className='mt-8'
                columns={columns}
                dataSource={[]}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                    defaultCurrent: 1,
                    style: {display: "flex", flexDirection: "row", justifyContent: "flex-start", margin: "16px 0",},
                }}
            />
        </div>
    )
}