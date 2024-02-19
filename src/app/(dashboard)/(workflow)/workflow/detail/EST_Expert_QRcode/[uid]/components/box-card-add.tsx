import { Button, Col, Form, Spin, Typography } from "antd/lib";
import useUiWorkflowBoxAdd from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/hook/use-ui-workflow-box-add";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const BoxCardAdd = ({ package_uid }: { package_uid: string }) => {
  const { boxAdd, form, rules, availableBox } =
    useUiWorkflowBoxAdd(package_uid);

  return (
    <Col xs={24} md={12} xl={8} xxl={6}>
      <Spin spinning={boxAdd.isPending}>
        <div className="min-h-[717px] w-full border-2 border-dashed border-primary-500 p-4 rounded-2xl flex flex-col justify-between space-y-4">
          <Typography className="font-semibold text-lg">افزودن جعبه</Typography>
          <PlusIcon className="mx-auto w-[105px] h-[105px] text-gray-700" />
          <Form
            form={form}
            onFinish={async (values) => {
              boxAdd.mutateAsync(values), form.resetFields();
            }}
            layout="vertical"
            className="w-full"
            disabled={boxAdd.isPending}
          >
            <Form.Item
              label="جعبه"
              name="box_UID"
              required={false}
              rules={[rules]}
            >
              <Select
                options={availableBox.data}
                loading={availableBox.isFetching}
                fieldNames={availableBox.fieldName}
                placeholder="انتخاب کنید"
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="نوع جعبه"
              name="box_usage_type"
              required={false}
              rules={[rules]}
            >
              <Select
                options={[
                  {
                    label: "اصلی",
                    value: 1,
                  },
                  {
                    label: "شاهد 1",
                    value: 2,
                  },
                  {
                    label: "شاهد 2",
                    value: 3,
                  },
                ]}
                placeholder="انتخاب کنید"
                size="large"
                className="w-full"
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
  );
};

export default BoxCardAdd;
