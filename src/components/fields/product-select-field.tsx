import { Select } from "antd";
import React from "react";
import { SelectProps } from "antd/lib";
import { useProductList } from "@/hooks/basic/product/use-product-list";

const ProductSelectField = (props: SelectProps) => {
  const productList = useProductList();

  return (
    <Select
      {...props}
      showSearch
      options={productList.options}
      loading={productList.isFetching}
      size="large"
      placeholder="انتخاب نمایید"
      tokenSeparators={[","]}
    />
  );
};

export { ProductSelectField };
