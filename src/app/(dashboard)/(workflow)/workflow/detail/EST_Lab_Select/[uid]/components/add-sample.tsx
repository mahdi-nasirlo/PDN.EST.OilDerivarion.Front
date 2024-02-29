"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Popover, Row, Select, Typography } from "antd/lib";
import { motion } from "framer-motion";
import { Card } from "@/components/card";
import { PlusSmallIcon, TrashIcon } from "@heroicons/react/24/outline";
import { errorMessage } from "../../../../../../../../constance/error-message";
import useLabBoxSampleGetAvailableList from "@/hooks/request-package/use-lab-box-sample-get-available-list";
import useLabBoxSampleAdd from "@/hooks/request-package/use-lab-box-sample-add";
import { filterOption } from "@/lib/filterOption";

const AddSample = ({
  package_UID,
  box_UID,
  lab_UID,
}: {
  package_UID: string;
  box_UID: string;
  lab_UID: string;
}) => {
  const addSampleLabBox = useLabBoxSampleAdd({ lab_UID, package_UID, box_UID });

  const [addPop, setAddPop] = useState<boolean>();

  const availableSample = useLabBoxSampleGetAvailableList({
    package_UID,
    box_UID,
    lab_UID,
  });

  return (
    <Popover
      open={addPop}
      trigger="click"
      content={
        <Form
          disabled={addSampleLabBox.isPending}
          onFinish={async (values) => {
            const res = await addSampleLabBox.mutateAsync(values);
            if (res.success) setAddPop(false);
          }}
        >
          <Form.Item
            name="sample_UID"
            required={false}
            rules={[
              {
                required: true,
                message: errorMessage.required_choice,
              },
            ]}
            className="max-sm:w-80 max-md:w-96 w-[420px]"
            label="مواد اولیه / محصول"
            labelCol={{ span: 24 }}
          >
            <Select
              showSearch
              className="w-full"
              filterOption={filterOption}
              options={availableSample.data}
              fieldNames={availableSample.fieldName}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              loading={addSampleLabBox.isPending}
              htmlType="submit"
              type="primary"
              size="middle"
            >
              ثبت
            </Button>
          </div>
        </Form>
      }
      title="افزودن نمونه"
    >
      <Button
        shape="circle"
        type="dashed"
        className="w-36 h-36 font-medium flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-primary-500 whitespace-break-spaces"
      >
        <PlusSmallIcon className="w-5 h-5" />
        افزودن نمونه
      </Button>
    </Popover>
  );
};

export default AddSample;
