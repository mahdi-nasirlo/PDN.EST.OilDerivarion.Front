import React, { useEffect, useState } from 'react'
import { Product, ProductTestItem } from '../../../../../../interfaces/product';
import useSWR from 'swr';
import { listFetcher } from '../../../../../../lib/server/listFetcher';
import useSWRMutation from 'swr/mutation';
import { mutationFetcher } from '../../../../../../lib/server/mutationFetcher';
import { Button, Space, Table, TableColumnsType } from 'antd';
import StatusColumn from '../../../../../../components/CustomeTable/StatusColumn';
import { addAlphabetToData } from '../../../../../../lib/addAlphabetToData';
import ConfirmDeleteModal from '@/components/confirm-delete-modal';

const TestExpandedRowRender = ({ product, TableMutate }: { product: Product, TableMutate: () => void }) => {

    const [openProductTestItem, setOpenProductTestItem] = useState<boolean>(false);

    const [recordToDeleteProductTestItem, setRecordToDeleteProductTestItem] = useState<any>();

    const defaultValueProductTestItem = {
        productUid: product.uid,
        testItemUid: null,
        IsActive: null,
    };

    const {
        data: ProductTestItem,
        isLoading: ldProductTestItem,
        mutate: mutateProductTestItem
    } = useSWR<ProductTestItem[]>(
        ["/ProductTestItem/GetAll", defaultValueProductTestItem],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
    );

    const {
        trigger: DeleteProductTestItem,
        isMutating: isMutatingProductTestItem
    } = useSWRMutation(
        "/ProductTestItem/Delete",
        mutationFetcher
    );

    const handleDeleteProductTestItem = async () => {
        const res = await DeleteProductTestItem({ uid: recordToDeleteProductTestItem?.Uid });
        if (res) {

            await mutateProductTestItem();
            await TableMutate();
            setOpenProductTestItem(false);
        }
    };

    useEffect(() => {
        if (!ldProductTestItem) {
            mutateProductTestItem();
        }
    }, [product]);

    const expandColumnsProductTestItem: TableColumnsType<ProductTestItem> = [
        { title: "#", dataIndex: "Row", key: "1", width: "5%" },
        { title: "نام فاکتور آزمون", dataIndex: "TestItemName", key: "2" },
        {
            title: "فعال/غیر فعال",
            dataIndex: "IsActive",
            key: "3",
            render: (_, record) => <StatusColumn record={record} />
        },
        // {
        //     title: "عملیات",
        //     dataIndex: "2",
        //     key: "upgradeNum",
        //     align: "center",
        //     fixed: "right",
        //     width: "10%",
        //     render: (_, record: ProductTestItem) => (
        //         <Space size="middle">
        //             <Button
        //                 type="link"
        //                 className="text-red-500 font-bold"
        //                 onClick={() => {
        //                     setOpenProductTestItem(true);
        //                     setRecordToDeleteProductTestItem(record);
        //                 }}
        //             >
        //                 حذف
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];



    const [openProductMaterial, setOpenProductMaterial] = useState<boolean>(false);

    const [recordToDeleteProductMaterial, setRecordToDeleteProductMaterial] = useState<any>();

    const defaultValueProductMaterial = {
        productUid: product.uid,
        materialUid: null,
        IsActive: null,
    };

    const { data: ProductMaterial, isLoading: ldProductMaterial, mutate: mutateProductMaterial } = useSWR<any[]>(
        ["/ProductMaterial/GetAll", defaultValueProductMaterial],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
    );


    const { trigger: deleteProductMaterial, isMutating: isMutatingProductMaterial } = useSWRMutation(
        "/ProductMaterial/Delete",
        mutationFetcher
    );

    const handleDeleteProductMaterial = async () => {
        await deleteProductMaterial({ uid: recordToDeleteProductMaterial?.Uid });

        await mutateProductMaterial();
        await TableMutate();
        setOpenProductMaterial(false);
    };

    useEffect(() => {
        if (!ldProductMaterial) {
            mutateProductMaterial();
        }
    }, [product]);

    const expandColumnsProductMaterial: TableColumnsType<any> = [
        {
            title: "#",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام ماده اولیه",
            dataIndex: "MaterialName",
            key: "2",
        },
        {
            title: "فعال/غیر فعال",
            dataIndex: "IsActive",
            key: "4",
            render: (_, record: any) => <StatusColumn record={record} />
        },
        // {
        //     title: "عملیات",
        //     dataIndex: "2",
        //     key: "upgradeNum",
        //     align: "center",
        //     fixed: "right",
        //     width: "10%",
        //     render: (_, record) => (
        //         <Space size="small">
        //             <Button
        //                 type="link"
        //                 className="text-red-500 font-bold"
        //                 onClick={() => {
        //                     setOpenProductMaterial(true);
        //                     setRecordToDeleteProductMaterial(record);
        //                 }}
        //             >
        //                 حذف
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <>
            <Table
                columns={expandColumnsProductTestItem}
                dataSource={addAlphabetToData(ProductTestItem)}
                loading={ldProductTestItem || isMutatingProductTestItem}
                pagination={false}
            />
            <ConfirmDeleteModal
                loading={isMutatingProductTestItem}
                open={openProductTestItem}
                setOpen={setOpenProductTestItem}
                handleDelete={handleDeleteProductTestItem}
                title="فاکتور آزمون محصول"
            />
            <Table
                columns={expandColumnsProductMaterial}
                dataSource={addAlphabetToData(ProductMaterial)}
                loading={ldProductMaterial || isMutatingProductMaterial}
                pagination={false}
            />
            <ConfirmDeleteModal
                loading={isMutatingProductMaterial}
                open={openProductMaterial}
                setOpen={setOpenProductMaterial}
                handleDelete={handleDeleteProductMaterial}
                title="مواد اولیه محصول"
            />
        </>
    );
};

export default TestExpandedRowRender;
