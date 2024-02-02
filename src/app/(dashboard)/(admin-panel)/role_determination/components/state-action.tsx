import React from 'react';
import { Button, Col, Form, Modal, Row } from "antd";
import MultipleSelect from "@/components/multiple-select";
import { useStateAction } from "@/app/(dashboard)/(admin-panel)/role_determination/hook/use-state-action";

interface TProps {
  open: string | undefined
  setOpen: (arg: string | undefined) => void
}

const StateAction = ({ open, setOpen }: TProps) => {

  const {
    form,
    rules,
    state,
    updateState,
    handleSubmit,
    getState
  } = useStateAction(setOpen, open)

  return (
    <div>
      <Modal
        title={'تعیین استان کاربر'}
        open={typeof open == "string"}
        onCancel={() => setOpen(undefined)}
        width={600}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={12} md={12}>
              <Button
                disabled={getState.isLoading}
                loading={updateState.isPending}
                size="large"
                className="w-full"
                type="primary"
                onClick={() => form.submit()}
                key={"submit"}
              >
                ثبت
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <Button
                disabled={updateState.isPending || getState.isLoading}
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={() => setOpen(undefined)}
                key={"cancel"}>
                انصراف
              </Button>
            </Col>
          </Row>
        ]}
      >
        <Form layout='vertical' form={form} onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item rules={[rules]} label="استان" name="sates_Uid">
                <MultipleSelect
                  loading={state.isLoading || getState.isLoading}
                  treeData={state.treeData} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default StateAction;
