import { Select } from "antd";
import React from "react";
import { SelectProps } from "antd/lib";
import { useProductList } from "@/hooks/basic/product/use-product-list";
import { filterOption } from "@/lib/filterOption";

const ProductSelectField = (props: SelectProps) => {
  const productList = useProductList();

  return (
    <Select
      {...props}
      showSearch
      options={productList.options}
      loading={productList.isFetching}
      filterOption={filterOption}
      size="large"
      placeholder="انتخاب نمایید"
      tokenSeparators={[","]}
    />
  );
};

export { ProductSelectField };
