import { Table } from "antd/lib";
import { z } from "zod";
import { materialApi } from "../../../../constance/material";

const CardListTable = ({
  data,
}: {
  data:
    | z.infer<typeof materialApi.GetRequestPackagePartList.item.shape.Products>
    | undefined;
}) => {
  console.log(data);

  return (
    <Table
      dataSource={data as []}
      pagination={false}
      columns={[
        {
          title: "نام محصول",
          dataIndex: "Name",
        },
      ]}
    />
  );
};

export { CardListTable };
