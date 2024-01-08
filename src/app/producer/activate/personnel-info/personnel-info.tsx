"use client";

import { Button, Col, Divider, Row } from "antd";
import React, { useContext } from "react";
import CreateForm from "./components/create-form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import DataTable from "./components/data-table";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import StepContext from "../stete-manager/step-context";

export default function PersonnelInfo() {
  const processController = useContext(StepContext);

  const {
    data: EmployeeMember,
    isLoading: ldEmployeeMember,
    mutate,
    isValidating,
  } = useSWR(["/ProducerUser/GetAllEmployee"], ([url, arg]: [url: string, arg: any]) =>
    listFetcher(url, { arg: { fromRecord: 0, selectRecord: 10000 } }));

  return (
    <>
      <CreateForm mutate={mutate} />
      <DataTable
        isValidating={isValidating}
        MainMember={addIndexToData(EmployeeMember)}
        ldMainMember={ldEmployeeMember}
        mutate={mutate}
      />
      <Divider />
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Button
            className="w-full bg-gray-100"
            size="large"
            type="dashed"
            htmlType="submit"
            onClick={() => processController.dispatch({ type: "PREVIOUS" })}
          >
            مرحله قبلی
          </Button>
        </Col>
        <Col span={12}>
          <Button
            className="w-full management-info-form-submit btn-filter"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={() =>
              processController.dispatch({ type: "NEXT", stepNumber: 7 })
            }
          >
            مرحله بعد
          </Button>
        </Col>
      </Row>
    </>
  );
}
