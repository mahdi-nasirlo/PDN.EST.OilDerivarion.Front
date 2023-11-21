"use client";

import React, { useState } from "react";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import FilterForm from "./components/filter-form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { Product, ProductCategoryGet } from "../../../../../interfaces/product";
import { Collapse } from "antd";
import getPageRecordNumber from "../../../../../lib/getPageRecordNumber";

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultValueTable = {
    Name: null,
    IsActive: null,
    productCategoryUid: null,
    ...getPageRecordNumber()
  };

  const [filter, setFilter] = useState<any>(defaultValueTable);

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

    setFilter({
      Name: values.Name,
      IsActive: values.IsActive,
      productCategoryUid: values.productCategoryUid,
      ...getPageRecordNumber(),
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
              <FilterForm unsetFilter={unsetFilter} filter={setFilterTable} isLoading={ldProduct} />
            ),
          },
        ]}
      />
      <DataTable
        setFilter={setFilter}
        mutate={mutate}
        product={product}
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
