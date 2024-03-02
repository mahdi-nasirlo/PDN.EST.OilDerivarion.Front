import useUiEstLabSelect from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/hook/use-ui-est-lab-select";
import {
  Button,
  Col,
  Divider,
  Form,
  Popover,
  Row,
  Select,
  Spin,
  Typography,
} from "antd/lib";
import React, { useState } from "react";
import { filterOption } from "@/lib/filterOption";
import { motion } from "framer-motion";
import { z } from "zod";
import { RequestPackageApi } from "constance/request-package";
import { Card } from "@/components/card";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import AddSample from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/components/add-sample";
import useLabBoxSampleDelete from "@/hooks/request-package/use-lab-box-sample-delete";
import { PlusOutlined } from "@ant-design/icons";
import { errorMessage } from "constance/error-message";

const BoxList = ({ package_UID }: { package_UID: string }) => {
  const {
    labList,
    labBoxAdd,
    boxAvailable,
    form,
    handleAddBox,
    setLab_UID,
    lab_UID,
    labBoxList,
    deleteLabBox,
  } = useUiEstLabSelect({
    package_UID,
  });

  const [openUidDelete, setOpenUidDelete] = useState<string>();

  return (
    <>
      <Row>
        <Col sm={12}>
          <Form.Item labelCol={{ span: 24 }} label="انتخاب آزمایشگاه">
            <Select
              placeholder="انتخاب کنید"
              value={lab_UID}
              filterOption={(input, option) =>
                filterOption(input, option, labList.fieldName.label)
              }
              onChange={(e: string) => {
                // console.log(e);
                setLab_UID(e);
              }}
              loading={labList.isFetching}
              fieldNames={labList.fieldName}
              options={labList.data}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Spin spinning={labBoxList.isFetching}>
        <Row gutter={[16, 12]} className="mb-5">
          <Col xs={24} md={12} xl={8} xxl={6}>
            <Spin spinning={labBoxAdd.isPending}>
              <div className="min-h-[717px] w-full border-2 border-dashed border-primary-500 p-4 rounded-2xl flex flex-col justify-between space-y-4">
                <Typography className="font-semibold text-lg">
                  افزودن جعبه
                </Typography>
                <PlusIcon className="mx-auto w-[105px] h-[105px] text-gray-700" />
                <Form
                  form={form}
                  onFinish={handleAddBox}
                  layout="vertical"
                  className="w-full"
                  disabled={labBoxAdd.isPending}
                >
                  <Form.Item
                    label="جعبه"
                    name="box_UID"
                    required={false}
                    rules={[
                      { required: true, message: errorMessage.required_choice },
                    ]}
                  >
                    <Select
                      showSearch
                      size="large"
                      className="w-full"
                      placeholder="انتخاب کنید"
                      filterOption={filterOption}
                      options={boxAvailable.data}
                      loading={boxAvailable.isFetching}
                      fieldNames={boxAvailable.fieldName}
                    />
                  </Form.Item>
                  <Button
                    size="large"
                    htmlType="submit"
                    type="primary"
                    className="w-full flex items-center justify-center"
                    icon={<PlusOutlined width={16} height={16} />}
                  >
                    افزودن جعبه
                  </Button>
                </Form>
              </div>
            </Spin>
          </Col>
          {labBoxList?.data?.map((item, index) => {
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
                        جعبه{" "}
                        {["اصلی", "شاهد 1", "شاهد 2"][item.box_usage_type - 1]}
                      </Typography>
                      <Typography>{item.box_info}</Typography>

                      <TrashIcon
                        color="red"
                        className="w-6 absolute left-2 top-2 cursor-pointer animate-bounce"
                        onClick={() => setOpenUidDelete(item.box_UID)}
                      />
                      <RenderCircles
                        lab_UID={lab_UID as string}
                        package_UID={package_UID}
                        cardIndex={index}
                        item={item}
                      />
                    </Card>
                  </motion.div>
                  <ConfirmDeleteModal
                    key={index}
                    title="جعبه"
                    loading={deleteLabBox.isPending}
                    open={typeof openUidDelete == "string"}
                    setOpen={setOpenUidDelete}
                    handleDelete={async () => {
                      const res = await deleteLabBox.mutateAsync({
                        box_UID: openUidDelete as string,
                      });
                      if (res) {
                        setOpenUidDelete(undefined);
                      }
                    }}
                  />
                </Col>
              </>
            );
          })}
          {/* <BoxCartList package_UID={package_UID} /> */}
        </Row>
      </Spin>
    </>
  );
};

const RenderCircles = ({
  package_UID,
  lab_UID,
  item,
  cardIndex = 0,
}: {
  lab_UID: string;
  package_UID: string;
  item: z.infer<typeof RequestPackageApi.BoxList.item>;
  cardIndex: number;
}) => {
  const labDeleteSample = useLabBoxSampleDelete();

  const [deletePop, setDeletePop] = useState<string | undefined>();

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
              <Typography>از حذف {sample.name} مطمئن هستید؟</Typography>
              <div className="flex justify-end">
                <Button
                  danger
                  className="mt-3 border-red-500 hover:border-red-500"
                  loading={labDeleteSample.isPending}
                  disabled={labDeleteSample.isPending}
                  onClick={async () => {
                    const res = await labDeleteSample.mutateAsync({
                      package_UID,
                      box_UID: item.box_UID,
                      sample_UID: sample.UID,
                      lab_Uid: lab_UID as string,
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
        <AddSample
          package_UID={package_UID}
          box_UID={item.box_UID}
          lab_UID={lab_UID as string}
        />
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
              exit={{ y: 20, opacity: 0, scale: 0 }}
            >
              {item}
            </motion.div>
          </Col>
        </>
      ))}
    </Row>
  );
};

export { BoxList };
