import React, {useState} from "react";
import {Table, TableProps, Typography} from "antd";
import GetPageRecordNumber from "@/utils/getPageRecordNumber";
import {addIndexToData} from "@/utils/addIndexToData";

interface RecordeValue {
  header?: {
    icon: React.ReactNode;
    text: string
    actions?: React.ReactNode
  }
  setInitialData: (arg: any) => void;
  isLoading: boolean;
  data: any[] | undefined
  // data: any[] | {
  //   records: any[];
  //   count: number;
  // } | undefined;
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
    props.setInitialData((prev: any) => {
      delete prev.fromRecord;
      delete prev.selectRecord;
      return { ...GetPageRecordNumber(e), ...prev };
    });
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
        // dataSource={addIndexToData(
        //   props.data?.records,
        //   "Row",
        //   (page - 1) * 5 + 1
        // )}
        dataSource={addIndexToData(props?.data, "Row") as []}
        className="mt-6"
        columns={props.columns}
      // pagination={{
      //   total: props.data?.count,
      //   showTotal: (total, range) => (
      //     <Typography>
      //       {`شماره صفحه ${page} از ${Math.ceil(total / 5)}`}
      //     </Typography>
      //   ),
      //   onChange: async (e: any) => {
      //     console.log(e);
      //     handleChangePage(e);
      //   },
      //   defaultPageSize: 5,
      //   showSizeChanger: false,
      //   defaultCurrent: 1,
      //   current: page,
      //   style: {
      //     display: "flex",
      //     flexDirection: "row",
      //     justifyContent: "flex-start",
      //     margin: "16px 0",
      //   },
      // }}
      />
    </>
  );
};

export default Index;
