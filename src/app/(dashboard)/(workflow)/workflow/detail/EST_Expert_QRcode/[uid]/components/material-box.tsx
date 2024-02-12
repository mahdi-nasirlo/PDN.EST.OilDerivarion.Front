"use client";
import {Row, Spin, Typography} from "antd/lib";
import React from "react";
import useUiWorkflowBoxAdd
    from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/hook/use-ui-workflow-box-add";
import BoxCartList from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/components/box-cart-list";
import BoxCardAdd from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/components/box-card-add";

const MaterialsBox = ({package_UID}: { package_UID: string }) => {

    const {boxList, boxAdd, form, rules, availableBox} = useUiWorkflowBoxAdd(package_UID)

    return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          تعیین مواد اولیه جعبه
        </Typography>
      </div>
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col xs={24} sm={24}>*/}
        {/*    <Form.Item labelCol={{ span: 24 }} label="جعبه ">*/}
        {/*      <Select*/}
        {/*        showSearch*/}
        {/*        //   loading={productCategory.isLoading}*/}
        {/*        //   options={productCategory.options}*/}
        {/*        size="large"*/}
        {/*        placeholder="انتخاب کنید"*/}
        {/*        className="w-full mb-3"*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        <Spin spinning={boxList.isFetching}>
            <Row gutter={[16, 12]}>
                <BoxCardAdd package_uid={package_UID}/>
                <BoxCartList package_UID={package_UID}/>
            </Row>
        </Spin>
        {/*<div className="grid grid-cols-2 gap-4 mt-5">*/}
        {/*<div className="rounded-full bg-neutral-200 w-20 h-20 flex justify-between items-center">*/}
        {/*  /!* <Button type="link" className="text-secondary-500">*/}
        {/*    افزودن*/}
        {/*  </Button> *!/*/}
        {/*</div>*/}

        {/*<div className="rounded-full bg-neutral-200 w-20 h-20"></div>*/}
        {/*<div className="rounded-full bg-neutral-200 w-20 h-20"></div>*/}

        {/*<div className="rounded-full bg-neutral-200 w-20 h-20"></div>*/}
        {/*<div className="rounded-full bg-neutral-200 w-20 h-20"></div>*/}

        {/*<div className="rounded-full bg-neutral-200 w-20 h-20"></div>*/}
        {/*</div>*/}
        {/*<Col xs={24} sm={6}>*/}
        {/*  <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80"></Card>*/}
        {/*</Col>*/}
        {/*<Col xs={24} sm={6}>*/}
        {/*  <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80"></Card>*/}
        {/*</Col>*/}
        {/*<Col xs={24} sm={6}>*/}
        {/*  <Card className="card-body-p-0 bg-gray-500 bg-opacity-60 h-80 w-80"></Card>*/}
        {/*</Col>*/}
    </>
    );
};
export default MaterialsBox;
