import React, { useEffect, useState } from "react";
import { Table, TableProps } from "antd";
import GetPageRecordNumber from "../getPageRecordNumber";
import { addIndexToData } from "../addIndexToData";

interface RecordeValue {
  setInitialData: (arg: any) => void;
  isLoading: boolean;
  data:
    | {
        records: any[];
        count: number;
      }
    | undefined;
}

const Index = (props: TableProps<any> & RecordeValue) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (props.data?.count && Math.ceil((props.data?.count || 1) / 5) < page) {
      handleChangePage(1);
    }
  }, [props.data?.count, page]);

  const handleChangePage = (e: number) => {
    setPage(e);
    props.setInitialData((prev: any) => {
      delete prev.fromRecord;
      delete prev.selectRecord;
      return { ...GetPageRecordNumber(e), ...prev };
    });
  };

  return (
    <>
      <Table
        {...props}
        loading={props.isLoading}
        dataSource={addIndexToData(
          props.data?.records,
          "Row",
          (page - 1) * 5 + 1
        )}
        className="mt-6"
        columns={props.columns}
        pagination={{
          total: props.data?.count,
          onChange: async (e: any) => {
            console.log(e);
            handleChangePage(e);
          },
          defaultPageSize: 5,
          showSizeChanger: false,
          defaultCurrent: 1,
          current: page,
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: "16px 0",
          },
        }}
      />
    </>
  );
};

export default Index;
