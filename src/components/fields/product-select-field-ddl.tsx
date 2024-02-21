import { Select } from "antd";
import React from "react";
import { SelectProps } from "antd/lib";
import useRequestPakagePartProductListDDl from "@/hooks/request-package/use-request-pakage-part-product-list-ddl";
import { filterOption } from "@/lib/filterOption";

const ProductSelectFieldDDL = (props: SelectProps) => {
  const productListDDl = useRequestPakagePartProductListDDl();

  return (
    <Select
      {...props}
      showSearch
      options={productListDDl.options}
      loading={productListDDl.isFetching}
      filterOption={filterOption}
      size="large"
      placeholder="انتخاب نمایید"
      tokenSeparators={[","]}
    />
  );
};

export { ProductSelectFieldDDL };
