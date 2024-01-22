import React, { useEffect, useState } from "react";
import { Col, Form, FormInstance, Input, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { PlusIcon } from "@heroicons/react/24/outline";
import { filterOption } from "../../../../../lib/filterOption";

function BarcodeFormInteractive(props: {
  ID: number | undefined;
  name: string | undefined;
  form: FormInstance;
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
                message: "لطفا مقدار را وارد کنید",
              },
            ]}
          >
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              fieldNames={{ value: "Uid", label: "Code" }}
              loading={isLdGps}
              options={GPS}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        {/* <BarcodeFormLockup
          form={props.form}
          setUid={setRequestMasterUid}
          open={open}
          setOpen={setOpen}
        /> */}
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
              // @ts-ignore
              filterOption={filterOption}
              fieldNames={{ value: "Uid", label: "MaterialName" }}
              loading={isLdMaterial}
              options={materials}
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
                message: "لطفا مقدار را وارد کنید",
              },
            ]}
          >
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              fieldNames={{ value: "Uid", label: "ProductName" }}
              loading={isLdProduct}
              options={products}
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
