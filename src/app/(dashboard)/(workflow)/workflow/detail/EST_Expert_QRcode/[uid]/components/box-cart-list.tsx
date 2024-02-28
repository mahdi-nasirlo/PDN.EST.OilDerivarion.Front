"use client";

import React, { useState } from "react";
import { Button, Col, Form, Popover, Row, Select, Typography } from "antd/lib";
import { motion } from "framer-motion";
import { Card } from "@/components/card";
import { PlusSmallIcon, TrashIcon } from "@heroicons/react/24/outline";
import useUiWorkflowSampleAdd from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/hook/use-ui-workflow-sample-add";
import useBoxSampleGetAvailableList from "@/hooks/request-package/use-box-sample-get-available-list";
import useBoxSampleAdd from "@/hooks/request-package/use-box-sample-add";
import { errorMessage } from "../../../../../../../../constance/error-message";
import { RequestPackageApi } from "../../../../../../../../constance/request-package";
import { z } from "zod";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { filterOption } from "@/lib/filterOption";

const BoxCartList = ({ package_UID }: { package_UID: string }) => {
  const { boxList, deleteSample, deletebox } = useUiWorkflowSampleAdd({
    package_UID,
  });

  const [openUidDelete, setOpenUidDelete] = useState<string>();

  const [deletePop, setDeletePop] = useState<string | undefined>();

  const renderCircles = (
    item: z.infer<typeof RequestPackageApi.BoxList.item>,
    cardIndex: number = 0
  ) => {
    const views: React.ReactNode[] = [];

    if (Array.isArray(item?.samples)) {
      item.samples?.map((sample, index) =>
        views.push(
          <Popover
            open={deletePop == sample.UID}
            trigger="click"
            title="حذف نمونه"
            content={
              <>
                <Typography>از حذف ماده {sample.name} مطمئن هستید؟</Typography>
                <div className="flex justify-end">
                  <Button
                    danger
                    className="mt-3 border-red-500 hover:border-red-500"
                    loading={deleteSample.isPending}
                    disabled={deleteSample.isPending}
                    onClick={async () => {
                      const res = await deleteSample.mutateAsync({
                        package_UID,
                        box_UID: item.box_UID,
                        sample_UID: sample.UID,
                      });
                      if (res.success) setDeletePop(undefined);
                    }}
                  >
                    حذف
                  </Button>
                </div>
              </>
            }
          >
            <Button
              onClick={() => {
                setDeletePop(
                  typeof deletePop == "string" ? undefined : sample.UID
                );
              }}
              shape="circle"
              type="default"
              style={{ backgroundImage: "url(/static/pattern.png" }}
              className="bg-center bg-cover hover:border-8 w-36 h-36 text-sm border-8 border-primary-500 flex flex-col items-center justify-center space-y-2.5"
              key={index}
            >
              <Typography className="bg-white p-1 rounded-lg shadow-sm whitespace-break-spaces">
                {sample.name}
              </Typography>
            </Button>
          </Popover>
        )
      );
    }

    Array.from({
      length: item?.capacity - (item.samples?.length ?? 0) ?? 0,
    }).map((value, index) =>
      views.push(
        index == 0 ? (
          <AddSample package_UID={package_UID} box_UID={item.box_UID} />
        ) : (
          <Button
            shape="circle"
            type="dashed"
            className="w-36 h-36 opacity-60 bg-gray-100 cursor-default"
          />
        )
      )
    );

    return (
      <Row gutter={[12, 15]}>
        {views.map((item, index) => (
          <>
            <Col sm={12} className="p-0 flex items-center justify-center">
              <motion.div
                key={index}
                className="flex items-center flex-col"
                transition={{ delay: (index + cardIndex) * 0.4, duration: 0.2 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {item}
              </motion.div>
            </Col>
          </>
        ))}
      </Row>
    );
  };

  return boxList?.data?.map((item, index) => {
    return (
      <>
        <Col key={index} xs={24} sm={12} xl={8} xxl={6}>
          <motion.div
            key={index}
            className="relative"
            transition={{
              delay: index / 5,
            }}
            initial={{
              scale: 0,
              opacity: 0,
              bottom: -25,
              left: -10,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              bottom: 0,
              left: 0,
            }}
            exit={{
              scale: 0,
              transition: { duration: 1 },
              opacity: 0,
              bottom: 25,
            }}
          >
            <Card className="relative min-h-[717px] w-full border-2 bg-gray-50 p-4 rounded-2xl space-y-4">
              <Typography className="font-semibold text-lg">
                جعبه {["اصلی", "شاهد 1", "شاهد 2"][item.box_usage_type - 1]}
              </Typography>

              <TrashIcon
                color="red"
                className="w-6 absolute left-2 top-2 cursor-pointer animate-bounce"
                onClick={() => setOpenUidDelete(item.box_UID)}
              />
              {/*<div className="min-h-[600px]">*/}
              {renderCircles(item, index)}
            </Card>
          </motion.div>
          <ConfirmDeleteModal
            key={index}
            title="جعبه"
            loading={deletebox.isPending}
            open={typeof openUidDelete == "string"}
            setOpen={setOpenUidDelete}
            handleDelete={async () => {
              const res = await deletebox.mutateAsync({
                box_UID: openUidDelete as string,
                package_UID,
              });
              if (res) {
                setOpenUidDelete(undefined);
              }
            }}
          />
        </Col>
      </>
    );
  });
};

const AddSample = ({
  package_UID,
  box_UID,
}: {
  package_UID: string;
  box_UID: string;
}) => {
  const available = useBoxSampleGetAvailableList({ package_UID, box_UID });

  const addSample = useBoxSampleAdd({ package_UID, box_UID });

  const [addPop, setAddPop] = useState<boolean>();

  return (
    <Popover
      open={addPop}
      trigger="click"
      content={
        <Form
          disabled={addSample.isPending}
          onFinish={async (values) => {
            const res = await addSample.mutateAsync(values);
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
            label="مواد اولیه/ محصول"
            labelCol={{ span: 24 }}
          >
            <Select
              showSearch
              className="w-full"
              options={available.data}
              fieldNames={available.fieldName}
              filterOption={filterOption}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              loading={addSample.isPending}
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
export default BoxCartList;
