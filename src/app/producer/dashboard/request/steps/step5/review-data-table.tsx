import { Button, Collapse, Empty, Spin, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useContext } from "react";
import { Product } from "../../../../../../../interfaces/requestDetail";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useGetFinalPage from "../../../../../../../hooks/requestDetail/useGetFinalPage";
import { addIndexToData } from "../../../../../../../lib/addIndexToData";
import useDeleteStep from "../../../../../../../hooks/requestDetail/useDeleteStep";
import { addAlphabetToData } from "../../../../../../../lib/addAlphabetToData";

export default function ReviewDataTable() {
  const processController = useContext(StepContext);

  const finalPage = useGetFinalPage(
    processController.requestMaster.requestMasterUid
  );

  const deleteStep = useDeleteStep();

  const columns: ColumnsType<Product & { Row: number }> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام محصول",
      dataIndex: "name",
      key: "2",
      width: "10%",
    },
    {
      title: "درصد استحصال",
      dataIndex: "productUsageExploitation",
      key: "2",
      width: "10%",
    },
    {
      title: "درصد هدر رفت",
      dataIndex: "productUsageWasted",
      key: "2",
      width: "75%",
    },
  ];

  const columns2: ColumnsType<Product & { Row: number }> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام مواد اولیه",
      dataIndex: "name",
      key: "2",
      width: "10%",
    },
    {
      title: "درصد مواد اولیه",
      dataIndex: "usagePercentage",
      key: "3",
      width: "85%",
      render: (value) => <>{value}%</>,
    },
  ];

  return (
    <>
      <Spin spinning={deleteStep.isMutating || finalPage.isLoading}>
        <div className="grid grid-cols-1 gap-5">
          {finalPage?.data?.map((item, index) => {
            return (
              <>
                <Collapse
                  size="large"
                  expandIconPosition="right"
                  items={[
                    {
                      label: "درخواست شماره " + (index + 1),
                      extra: (
                        <Button
                          type="text"
                          size="small"
                          style={{ padding: "8px !important" }}
                          className="text-red-500 font-bold"
                          onClick={() =>
                            deleteStep.trigger({
                              stepNumber: item.stepNumber,
                              requestMasterUid:
                                processController.requestMaster
                                  .requestMasterUid,
                            })
                          }
                        >
                          حذف
                        </Button>
                      ),
                      children: (
                        <>
                          <Typography className="text-right font-medium text-lg mb-2">
                            لیست محصولات
                          </Typography>
                          <Table
                            loading={finalPage.isLoading}
                            columns={columns}
                            dataSource={addIndexToData(item.products)}
                            pagination={false}
                          />
                          <Typography className="text-right font-medium text-lg mb-2 mt-12">
                            لیست مواد اولیه
                          </Typography>
                          <Table
                            loading={finalPage.isLoading}
                            columns={columns2}
                            dataSource={addAlphabetToData(item.materials)}
                            pagination={false}
                          />
                        </>
                      ),
                    },
                  ]}
                />
              </>
            );
          })}

          {finalPage?.data?.length === 0 && <Empty />}
        </div>
      </Spin>
    </>
  );
}
