"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { Product, ProductCategoryGet } from "../../../../../interfaces/product";
import { Collapse } from "antd";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Name: null,
    IsActive: null,
    productCategoryUid: null,
    fromRecord: 0,
    selectRecord: 1000,
  };

  const [filter, setFilter] = useState(defaultValueTable);

  const {
    data: product,
    isLoading: ldProduct,
    mutate,
  } = useSWR<{
    records: Product[];
    count: number;
  }>(["/Product/GetPage", filter], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, { arg })
  );

  const setFilterTable = async (values: ProductCategoryGet) => {
    // @ts-ignore
    setFilter({
      Name: values.Name,
      IsActive: values.IsActive,
      productCategoryUid: values.productCategoryUid,
      fromRecord: 0,
      selectRecord: 100,
    });

    await mutate();
  };

  const unsetFilter = async () => {
    setFilter(defaultValueTable);

    await mutate();
  };

  return (
    <>
      {/*// @ts-ignore*/}
      <Collapse
        size="large"
        items={[
          {
            label: "فیلتر جدول",
            children: (
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} />
            ),
          },
        ]}
      />
      <DataTable
        mutate={mutate}
        product={product?.records}
        ldProduct={ldProduct}
        setModalVisible={setModalVisible}
      />
      <CreateModal
        mutate={mutate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
