import { Space, Table, Typography } from "antd";
import Link from "next/link";
import React from "react";

interface DataType {
  key: string;
  Row: number;
  name: string;
  TrackingCode: string;
  ConfirmedRequestCode: string;
  DateRegistration: string;
  ActivityStatus: string[];
  MaterialName: string;
}

export default function PrimaryInvationListTable() {
  //   const { data, isLoading } = useSWR<GetPage_ExeManager>(
  //     "/Producer/GetPage_ExeManager",
  //     (url) =>
  //       listFetcher(url, {
  //         arg: {
  //           fromRecord: 0,
  //           selectRecord: 100000,
  //         },
  //       })
  //   );

  // : ColumnsType<DataType>
  const columns = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام واحد تولیدی ",
      dataIndex: "ProductName",
      key: "2",
    },
    {
      title: "کدارسال کننده درخواست",
      dataIndex: "TrackingCode",
      key: "3",
    },
    {
      title: "زمان بازدید",
      dataIndex: "ConfirmedRequestCode",
      key: "4",
    },
    {
      title: "زمان باقی مانده بازدید",
      dataIndex: "DateRegistration",
      key: "5",
    },
    // {
    //   title: "جزئیات",
    //   dataIndex: "ActivityStatus",
    //   key: "6",
    //   // render: (_, {ActivityStatus}) => (
    //   //     <>
    //   //         {ActivityStatus.map((activityStatus) => {
    //   //             let color;
    //   //             switch (activityStatus) {
    //   //                 case 'دریافت استاندارد':
    //   //                     color = 'green';
    //   //                     break;
    //   //                 case 'عدم دریافت استاندارد':
    //   //                     color = 'red';
    //   //                     break;
    //   //                 case 'در حال آزمایش':
    //   //                     color = 'yellow';
    //   //                     break;
    //   //                 case 'loser':
    //   //                     color = 'volcano';
    //   //                     break;
    //   //                 default:
    //   //                     color = 'geekblue'; // Default color if none of the conditions match
    //   //                     break;
    //   //             }
    //   //
    //   //             return (
    //   //                 <Tag color={color} key={activityStatus}>
    //   //                     {activityStatus.toUpperCase()}
    //   //                 </Tag>
    //   //             );
    //   //         })}
    //   //
    //   //     </>
    //   // ),
    // },

    {
      title: "جزئیات",
      key: "جزئیات",
      render: () => (
        <Space size="middle">
          <Link href={""} className="action-btn-delete">
            مشاهده دعوت نامه
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="box-border w-full p-6 mt-8">
      <Typography className="text-right text-[16px] font-normal">
        لیست درخواست ها
      </Typography>
      <Table
        className="mt-8"
        columns={columns}
        dataSource={[]}
        pagination={{
          defaultPageSize: 10,
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

const data: DataType[] = [
  {
    key: "1",
    ConfirmedRequestCode: "fhsdhfksjhfkdshfs",
    Row: 1,
    name: "نفتا",
    TrackingCode: "02462556215",
    MaterialName: "امیرحسام خالویی",
    DateRegistration: "1400/01/01",
    ActivityStatus: ["1400/01/01", " ", "08:00"],
  },
  {
    key: "2",
    Row: 2,
    name: "بنزین پیرولیز",
    ConfirmedRequestCode: "fhsdhfksjhfkdshfs",
    TrackingCode: "02462556215",
    MaterialName: "امیرحسام خالویی",
    DateRegistration: "1400/01/01",
    ActivityStatus: ["1400/01/01", " ", "11:00"],
  },
];
