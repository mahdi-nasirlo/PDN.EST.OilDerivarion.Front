import React, { useState } from "react";
import { Col, Form, FormInstance, Row, Select } from "antd";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { filterOption } from "../../../../../lib/filterOption";
import { sortByIndex } from "../../../../../lib/sortByIndex";
import BarcodeFormInteractive from "./barcode-form-interactive";

function BarcodeForm(props: {
  form: undefined | FormInstance;
  setFilter?: any;
}) {
  const [containerType, setContainerType] = useState<{
    Id: number;
    Name: string;
  }>();

  const { isLoading: ldContainer, data: containers } = useSWR(
    "/BaseInfo/GetAllContainerType",
    listFetcher
  );

  const { isLoading: ldUsePlaceType, data: usePlaceType } = useSWR(
    "/BaseInfo/GetAllBarcodeUsePlaceType",
    listFetcher
  );

  const { isLoading: ldSampleType, data: sampleTypes } = useSWR(
    "/BaseInfo/GetAllSampleType",
    listFetcher
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Form.Item
          name="containerTypeId"
          label="نوع ظرف"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // @ts-ignore
            onChange={(value, option: { ID: number; Name: string }) =>
              setContainerType(option as any)
            }
            showSearch
            fieldNames={{ value: "Id", label: "Name" }}
            // @ts-ignore
            filterOption={filterOption}
            loading={ldContainer}
            options={sortByIndex(containers, 'Name')}
            size="large"
            placeholder="انتخاب کنید"
          />
        </Form.Item>
      </Col>
      {props.form && (
        <BarcodeFormInteractive
          setFilter={props.setFilter}
          form={props.form}
          ID={containerType?.Id}
          name={containerType?.Name}
        />
      )}
      <Col xs={24} md={12}>
        <Form.Item
          name="barcodeUsePlaceTypeId"
          label="نوع محل استفاده بارکد"
          rules={[
            {
              required: true,
              message: "لطفا مقدار را وارد کنید",
            },
          ]}
        >
          <Select
            showSearch
            fieldNames={{ value: "Id", label: "Name" }}
            //@ts-ignore
            filterOption={filterOption}
            loading={ldUsePlaceType}
            options={sortByIndex(usePlaceType, 'Name')}
            size="large"
            placeholder="انتخاب کنید"
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="sampleTypeId"
          label="نوع نمونه"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            // @ts-ignore
            filterOption={filterOption}
            fieldNames={{ value: "Id", label: "Name" }}
            loading={ldSampleType}
            options={sortByIndex(sampleTypes, 'Name')}
            size="large"
            placeholder="انتخاب کنید"
          />
        </Form.Item>
      </Col>
    </Row>
  );
}
// @ts-ignore
export default BarcodeForm;