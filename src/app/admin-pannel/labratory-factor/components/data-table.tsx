"use client";

import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useState } from "react";
import useSWR from "swr";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { ProductTestItem } from "../../../../../interfaces/product";


const columns: ColumnsType<Labratory> = [
  {
    title: "ردیف",
    dataIndex: "Row",
    key: "1",
  },
  { title: 'آزمایشگاه', dataIndex: 'Name', key: '2' },
  { title: 'استان', dataIndex: 'StateName', key: '3' },
];


const DataTable = ({ Labratory, ldProduct }: { Labratory: Labratory[], ldProduct: boolean }) => {

  const [activeExpRow, setActiveExpRow] = useState<string[]>()

  return (
    <Table
      className="mt-6"
      columns={columns}
      rowKey={"Uid"}
      loading={ldProduct}
      expandable={{
        expandedRowKeys: activeExpRow,
        onExpand: (expanded, record: Labratory) => {

          const keys: string[] = [];

          if (expanded && record.Uid) {
            // @ts-ignore
            keys.push(record.Uid);
          }

          if (!expanded) {
            keys.pop()
          }

          setActiveExpRow(keys);

        },
        expandedRowRender: (record: Labratory) => <ExpandedRowRender Labratory={record} />,
      }}
      dataSource={Labratory}
    />
  )
};


const ExpandedRowRender = ({ Labratory }: { Labratory: Labratory }) => {

  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<ProductTestItem | undefined>();

  const defaultValue = {
    "productUid": Labratory.Uid,
    "testItemUid": null,
    "is_Active": true
  }

  const {
    data,
    isLoading,
    mutate
  } = useSWR<ProductTestItem[]>(["/LabTestItem/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg }))

  const { trigger } = useSWRMutation("/LabTestItem/Delete", mutationFetcher)

  const deleteProductFactor = async () => {

    await trigger({ uid: recordToDelete?.Uid })

    await mutate()

    setOpen(false)

  }

  const expandColumns: TableColumnsType<ProductTestItem> = [
    { title: "#", dataIndex: "Row", key: "1" },
    { title: "نام فاکتور", dataIndex: "TestItemName", key: "2" },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      render: (_, record: ProductTestItem) => (
        <Space size="middle">
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              setOpen(true);
              setRecordToDelete(record)
            }}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return <>
    <Table columns={expandColumns} dataSource={addIndexToData(data)} loading={isLoading}
      pagination={false} />
    <ConfirmDeleteModal open={open} setOpen={setOpen} handleDelete={deleteProductFactor} title={"فاکتور آزمایشگاه"} />
  </>
}

export default DataTable;

// export default function DataTable({
//   setModalVisible,
// }: {
//   setModalVisible: any;
// }) {
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [recordToDelete, setRecordToDelete] = useState<
//     DataType | ExpandedDataType | null
//   >(null);

//   const handleDelete = (record: DataType | ExpandedDataType) => {
//     setRecordToDelete(record);
//     setIsDeleteModalVisible(true);
//   };
//   const showModal = () => {
//     setModalVisible(true);
//   };

//   const handleConfirmDelete = () => {
//     setIsDeleteModalVisible(false);
//   };
//   const handleCancelDelete = () => {
//     setIsDeleteModalVisible(false);
//     setRecordToDelete(null);
//   };

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "ردیف",
//       dataIndex: "Row",
//       key: "1",
//     },
//     {
//       title: "نام آزمایشگاه",
//       dataIndex: "factorsName",
//       key: "2",
//     },
//     {
//       title: "عملیات",
//       key: "عملیات",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             type="link"
//             className={"text-red-500 font-bold"}
//             onClick={() => handleDelete(record)}
//           >
//             حذف
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   interface ExpandedDataType {
//     key: React.Key;
//     date: string;
//     name: string;
//     upgradeNum: any;
//   }

//   const expandedRowRender = () => {
//     const columns: TableColumnsType<ExpandedDataType> = [
//       { title: "#", dataIndex: "1", key: "date" },
//       { title: "نام فاکتور", dataIndex: "1", key: "name" },
//       {
//         title: "عملیات",
//         dataIndex: "2",
//         key: "upgradeNum",
//         render: (_, record) => (
//           <Space size="middle">
//             <Button
//               type="link"
//               className="text-red-500 font-bold"
//               onClick={() => handleDelete(record)}
//             >
//               حذف
//             </Button>
//           </Space>
//         ),
//       },
//     ];
//     // const column: TableColumnsType<ExpandedDataType> = [
//     //   { title: "#", dataIndex: "1", key: "date" },
//     //   { title: "نام محصول", dataIndex: "1", key: "name" },
//     //   {
//     //     title: "عملیات",
//     //     dataIndex: "2",
//     //     key: "upgradeNum",
//     //     render: (_, record) => (
//     //       <Space size="middle">
//     //         <Button
//     //           type="link"
//     //           className="text-red-500 font-bold"
//     //           onClick={() => handleDelete(record)}
//     //         >
//     //           حذف
//     //         </Button>
//     //       </Space>
//     //     ),
//     //   },
//     // ];

//     const data = [];
//     for (let i = 0; i < 3; ++i) {
//       data.push({
//         key: i.toString(),
//         date: "2014-12-24 23:12:00",
//         name: "This is production name",
//         upgradeNum: "Upgraded: 56",
//       });
//     }
//     return (
//       <>
//         <Table columns={columns} dataSource={[]} pagination={false} />
//         {/* <Table columns={column} dataSource={[]} pagination={false} /> */}
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="box-border w-full p-6 mt-8">
//         <div className="flex justify-between items-center">
//           <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
//             لیست فاکتور های آزمایشگاه{" "}
//           </Typography>
//           <Button
//             className="max-md:w-full flex justify-center items-center gap-2"
//             size="large"
//             type="primary"
//             onClick={showModal}
//           >
//             <PlusIcon width={24} height={24} />
//             <span className="flex ">افزودن فاکتور آزمایشگاه</span>
//           </Button>
//         </div>
//         <Table
//           className="mt-6"
//           columns={columns}
//           expandable={{ expandedRowRender: expandedRowRender }}
//           dataSource={data}
//           pagination={{
//             defaultPageSize: 10,
//             showSizeChanger: true,
//             pageSizeOptions: ["10", "20", "50"],
//             defaultCurrent: 1,
//             style: {
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "flex-start",
//               margin: "16px 0",
//             },
//           }}
//         />
//         <Modal
//           width={600}
//           footer={[
//             <Row key={"box"} gutter={[16, 16]} className="my-2">
//               <Col xs={24} md={12}>
//                 <Button
//                   size="large"
//                   className="w-full bg-red-500 btn-filter"
//                   type="primary"
//                   onClick={handleConfirmDelete}
//                   key={"submit"}
//                 >
//                   حذف
//                 </Button>
//               </Col>
//               <Col xs={24} md={12}>
//                 <Button
//                   size="large"
//                   className="w-full bg-gray-100 text-warmGray-500"
//                   onClick={handleConfirmDelete}
//                   key={"cancel"}
//                 >
//                   انصراف
//                 </Button>
//               </Col>
//             </Row>,
//           ]}
//           title="حذف فاکتور"
//           open={isDeleteModalVisible}
//           onCancel={handleCancelDelete}
//         >
//           <p>آیا از حذف این فاکتور مطمئن هستید؟</p>
//         </Modal>
//       </div>
//     </>
//   );
// }

// const data: DataType[] = [
//   {
//     key: "1",
//     Row: 1,
//     factorsName: "بنزین",
//   },
//   {
//     key: "2",
//     Row: 2,
//     factorsName: "گازوئیل",
//   },
// ];
