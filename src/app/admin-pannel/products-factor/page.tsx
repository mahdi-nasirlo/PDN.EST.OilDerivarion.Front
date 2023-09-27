"use client";

import React, {useState} from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import {listFetcher} from "../../../../lib/server/listFetcher";
import {Product, ProductGet} from "../../../../interfaces/product";
import {addIndexToData} from "../../../../lib/addIndexToData";
import {Button, Typography} from "antd";
import {PlusIcon} from "@heroicons/react/24/outline";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const defaultValueTable = {
        name: null,
        is_Active: true,
        fromRecord: 0,
        selectRecord: 100000
    }

    const [filter, setFilter] = useState(defaultValueTable)

    const {data: product, isLoading: ldProduct, mutate} = useSWR<{
        records: Product[];
        count: number;
    }>(
        ["/Product/GetPage", filter],
        ([url, arg]: [string, any]) => listFetcher(url, {arg})
    );

    const setFilterTable = async (values: ProductGet) => {

        // @ts-ignore
        setFilter({name: values.name, is_Active: null, fromRecord: 0, selectRecord: 1000})

        await mutate()

    }

    const unsetFilter = async () => {

        setFilter(defaultValueTable)

        await mutate()

    }

    return (
        <>
            {/*// @ts-ignore*/}
            <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
            <div className="box-border w-full p-6 mt-8">
                <div className="flex justify-between items-center">
                    <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                        لیست فاکتور محصول
                    </Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        onClick={() => setModalVisible(true)}
                    >
                        <PlusIcon width={24} height={24}/>
                        <span className="flex ">افزودن فاکتور محصول</span>
                    </Button>
                </div>
                <DataTable product={addIndexToData(product?.records)} ldProduct={ldProduct}/>
            </div>
            <CreateModal
                mutate={mutate}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
