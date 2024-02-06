import React, {useState} from "react";
import {Table, TableProps, Typography} from "antd";
import {addIndexToData} from "@/utils/addIndexToData";
import GetPageRecordNumber from "@/utils/getPageRecordNumber";

interface RecordeValue {
    header?: {
        icon?: React.ReactNode;
        text: string
        actions?: React.ReactNode
    }
    setInitialData?: (arg: any) => void;
    isLoading?: boolean;
    data: {
        records: any[] | undefined;
        count?: number;
    } | undefined;
}

const Index = (props: TableProps<any> & RecordeValue) => {

  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   if (props.data?.count && Math.ceil((props.data?.count || 1) / 5) < page) {
  //     handleChangePage(1);
  //   }
  // }, [props.data, page]);

  const handleChangePage = (e: number) => {
    setPage(e);
      if (props.setInitialData) {
          props?.setInitialData((prev: any) => {
              console.log(prev)
              delete prev.fromRecord;
              delete prev.selectRecord;
              return {...GetPageRecordNumber(e), ...prev};
          });
      }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        {props.header && (
          <>
            <Typography className="flex items-center gap-2 text-right text-[16px] font-bold mr-2">
              {props.header.icon && (
                <span className="text-gray-900 w-8 h-8">{props.header.icon}</span>
              )}
              {props.header.text}
            </Typography>
            {props.header.actions}
          </>
        )}
      </div>
      <Table
        {...props}
        loading={props.isLoading}
        dataSource={addIndexToData(props?.data?.records || [], "Row", (page - 1) * 5 + 1) as []}
        className="mt-6"
        columns={props.columns}
        pagination={props.pagination ?? {
          total: props.data?.count,
          showTotal: (total, range) => (
              <>
                  <Typography>
                      {` صفحه ${page} از ${Math.ceil(total / 5)}`}
                  </Typography>
                  <Typography className="mr-3 font-semibold">
                      تعداد: {total}
                  </Typography>
              </>
          ),
          onChange: handleChangePage,
          defaultPageSize: 5,
          showSizeChanger: false,
          defaultCurrent: 1,
          current: page,
          style: {
            display: "flex",
            flexDirection: "row",
              justifyContent: "flex-end",
            margin: "16px 0",
          },
        }}
      />
    </>
  );
};

export default Index;
