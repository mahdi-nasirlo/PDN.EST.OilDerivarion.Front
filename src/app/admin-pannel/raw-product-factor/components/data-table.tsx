"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useState } from "react";

interface DataType {
  key: string;
  Row: number;
  factorsName: string;
}

export default function DataTable({
  setModalVisible,
}: {
  setModalVisible: any;
}) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<
    DataType | ExpandedDataType | null
  >(null);

  const handleDelete = (record: DataType | ExpandedDataType) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalVisible(false);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام ماده اولیه",
      dataIndex: "factorsName",
      key: "2",
    },
    {
      title: "عملیات",
      key: "عملیات",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  interface ExpandedDataType {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: any;
  }

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "#", dataIndex: "1", key: "date" },
      { title: "نام فاکتور", dataIndex: "1", key: "name" },
      {
        title: "عملیات",
        dataIndex: "2",
        key: "upgradeNum",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="link"
              className="text-red-500 font-bold"
              onClick={() => handleDelete(record)}
            >
              حذف
            </Button>
          </Space>
        ),
      },
    ];
    // const column: TableColumnsType<ExpandedDataType> = [
    //   { title: "#", dataIndex: "1", key: "date" },
    //   { title: "نام محصول", dataIndex: "1", key: "name" },
    //   {
    //     title: "عملیات",
    //     dataIndex: "2",
    //     key: "upgradeNum",
    //     render: (_, record) => (
    //       <Space size="middle">
    //         <Button
    //           type="link"
    //           className="text-red-500 font-bold"
    //           onClick={() => handleDelete(record)}
    //         >
    //           حذف
    //         </Button>
    //       </Space>
    //     ),
    //   },
    // ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return (
      <>
        <Table columns={columns} dataSource={[]} pagination={false} />
        {/* <Table columns={column} dataSource={[]} pagination={false} /> */}
      </>
    );
  };

  return (
    <>
      <div className="box-border w-full p-6 mt-8">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست فاکتور های ماده اولیه
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex ">افزودن فاکتور ماده اولیه</span>
          </Button>
        </div>
        <Table
          className="mt-6"
          columns={columns}
          expandable={{ expandedRowRender: expandedRowRender }}
          dataSource={data}
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
        <Modal
          width={600}
          footer={[
            <Row key={"box"} gutter={[16, 16]} className="my-2">
              <Col xs={24} md={12}>
                <Button
                  size="large"
                  className="w-full bg-red-500 btn-filter"
                  type="primary"
                  onClick={handleConfirmDelete}
                  key={"submit"}
                >
                  حذف
                </Button>
              </Col>
              <Col xs={24} md={12}>
                <Button
                  size="large"
                  className="w-full bg-gray-100 text-warmGray-500"
                  onClick={handleConfirmDelete}
                  key={"cancel"}
                >
                  انصراف
                </Button>
              </Col>
            </Row>,
          ]}
          title="حذف فاکتور"
          open={isDeleteModalVisible}
          onCancel={handleCancelDelete}
        >
          <p>آیا از حذف این فاکتور مطمئن هستید؟</p>
        </Modal>
      </div>
    </>
  );
}

const data: DataType[] = [
  {
    key: "1",
    Row: 1,
    factorsName: "بنزین",
  },
  {
    key: "2",
    Row: 2,
    factorsName: "گازوئیل",
  },
];
