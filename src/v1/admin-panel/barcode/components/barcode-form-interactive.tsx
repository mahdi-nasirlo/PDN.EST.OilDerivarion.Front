import React, { useEffect, useState } from "react";
import { Col, Form, FormInstance, Input, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { PlusIcon } from "@heroicons/react/24/outline";
import { filterOption } from "../../../../../lib/filterOption";
import { sortByIndex } from "../../../../../lib/sortByIndex";
import BarcodeFormLockup from "./barcode-form-lockup";
// import BarcodeFormLockup from "./barcode-form-lockup";

function BarcodeFormInteractive(props: {
  ID: number | undefined;
  name: string | undefined;
  form: FormInstance;
  setFilter?: any;
}) {
  const [open, setOpen] = useState(false);

  const { isLoading: isLdMaterial, data: materials } = useSWR(
    props.ID === 2 ? "/RequestDetail/GetAllMaterial" : null,
    (url) =>
      listFetcher(url, {
        arg: {
          requestMasterUid: null,
          isLastStep: null,
        },
      })
  );

  const { isLoading: isLdProduct, data: products } = useSWR(
    props.ID === 3 ? "/RequestDetail/GetAllProduct" : null,
    (url) =>
      listFetcher(url, {
        arg: {
          requestMasterUid: null,
          isLastStep: null,
        },
      })
  );

  const { isLoading: isLdGps, data: GPS } = useSWR(
    props.ID === 1 ? "/GpsDevice/GetAll" : null,
    (url) =>
      listFetcher(url, {
        arg: {
          code: null,
          IsActive: null,
        },
      })
  );

  useEffect(() => { }, [props.ID]);

  const [requestMasterUid, setRequestMasterUid] = useState<string>("");

  if (props.ID === null) {
    return <></>;
  }

  if (props.ID === 1) {
    return (
      <>
        <Col xs={24} md={12}>
          <Form.Item
            name="requestMasterUid"
            label="شناسه درخواست"
            rules={[
              {
                required: true,
                message: "لطفا مقدار را وارد کنید",
              },
            ]}
          >
            <div className="hidden">{requestMasterUid}</div>
            <Input
              value={requestMasterUid}
              size="large"
              placeholder={"انتخاب کنید"}
              addonAfter={
                <>
                  <PlusIcon
                    className="text-primary-500 cursor-pointer"
                    onClick={() => setOpen(true)}
                    width="20"
                    height="20"
                  />
                </>
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="gpsDeviceUid"
            label="دستگاه GPS"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              fieldNames={{ value: "Uid", label: "Code" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={isLdGps}
              options={sortByIndex(GPS, 'Code')}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <BarcodeFormLockup
          setFilter={props.setFilter}
          form={props.form}
          setUid={setRequestMasterUid}
          open={open}
          setOpen={setOpen}
        />
      </>
    );
  }

  if (props.ID === 2) {
    return (
      <>
        <Col xs={24} md={12}>
          <Form.Item
            name="requestDetailUid"
            label="مواد اولیه"
            rules={[
              {
                required: true,
                message: "لطفا مقدار را وارد کنید",
              },
            ]}
          >
            <Select
              showSearch
              fieldNames={{ value: "Uid", label: "MaterialName" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={isLdMaterial}
              options={sortByIndex(materials, 'MaterialName')}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </>
    );
  }

  if (props.ID === 3) {
    return (
      <>
        <Col xs={24} md={12}>
          <Form.Item
            name="requestDetailUid"
            label="محصول"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              fieldNames={{ value: "Uid", label: "ProductName" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={isLdProduct}
              options={sortByIndex(products, 'ProductName')}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </>
    );
  }
}

export default BarcodeFormInteractive;
