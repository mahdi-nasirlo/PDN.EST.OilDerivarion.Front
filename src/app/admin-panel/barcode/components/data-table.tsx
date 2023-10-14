import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import React from "react";
import {Product} from "../../../../../interfaces/product";


const columns: ColumnsType<Product> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: 'نام محصول',
        dataIndex: 'Name',
        key: '2',
    },
];


const DataTable = ({product, ldProduct}: { product: Product[], ldProduct: boolean }) => {

    return (
        <Table
            className="mt-6"
            columns={columns}
            rowKey={"Uid"}
            loading={ldProduct}
            dataSource={product}
        />
    )
};

export default DataTable;