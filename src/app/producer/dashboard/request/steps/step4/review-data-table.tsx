import {Table} from 'antd'
import {ColumnsType} from 'antd/es/table';
import React, {useContext} from 'react'
import {Product} from "../../../../../../../interfaces/requestDetail";
import {addIndexToData} from "../../../../../../../lib/addIndexToData";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useCrudRequestDetailProduct from "../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import useGetPageProductRequestDetail from "../../../../../../../hooks/requestDetail/useGetPageProductRequestDetail";

export default function ReviewDataTable() {

    const processController = useContext(StepContext)

    const getPageRequestDetailProduct = useGetPageProductRequestDetail(processController.requestMaster.requestMasterUid)

    const requestDetailProductCrud = useCrudRequestDetailProduct()

    const columns: ColumnsType<Product & { Row: number }> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام محصول",
            dataIndex: "ProductOrMaterialName",
            key: "2",
        },
        {
            title: "دانسیته",
            dataIndex: "ProductDensityTypeId",
            key: "3",
        },
    ];


    return (
        <>
            <Table
                loading={getPageRequestDetailProduct.isLoading || requestDetailProductCrud.delete.isLoading}
                columns={columns}
                dataSource={addIndexToData(getPageRequestDetailProduct.data?.records)}
                pagination={false}
            />
        </>
    )
}