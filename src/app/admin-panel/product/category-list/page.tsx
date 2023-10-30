"use client";

import React, {useState} from "react";
import FilterForm from "./components/filter-form";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import useSWR from "swr";
import {Category} from "../../../../../interfaces/category";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {ProductGet} from "../../../../../interfaces/product";
import {Collapse} from "antd";
import getPageRecordNumber from "../../../../../lib/getPageRecordNumber";

export default function Page() {
    const defaultValueTable = {
        name: null,
        IsActive: null,
        densityTypeId: null,
        ...getPageRecordNumber()
    };

    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState<ProductGet>(defaultValueTable);

    const {
        data: category,
        isLoading: ldCategory,
        mutate,
        isValidating,
    } = useSWR<{
        records: Category[];
        count: number;
    }>(
        ["/ProductCategory/GetPage", filter],
        ([url, arg]: [url: string, arg: any]) =>
            listFetcher(url, {
                arg,
            })
    );

  const setFilterTable = async (values: ProductGet) => {
    // @ts-ignore
    setFilter({
      name: values.name,
      IsActive: values.IsActive,
      densityTypeId: values.densityTypeId,
        ...getPageRecordNumber()
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
                          <FilterForm unsetFilter={unsetFilter} filter={setFilterTable}/>
                      ),
                  },
              ]}
          />
          <DataTable
              setFilter={setFilter}
              isValidating={isValidating}
              mutate={mutate}
              category={category}
              ldCategory={ldCategory}
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
