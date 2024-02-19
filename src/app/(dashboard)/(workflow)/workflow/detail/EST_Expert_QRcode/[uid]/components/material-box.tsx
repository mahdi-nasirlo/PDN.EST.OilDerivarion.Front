"use client";
import { Row, Spin, Typography } from "antd/lib";
import React from "react";
import useUiWorkflowBoxAdd from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/hook/use-ui-workflow-box-add";
import BoxCartList from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/components/box-cart-list";
import BoxCardAdd from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/components/box-card-add";

const MaterialsBox = ({ package_UID }: { package_UID: string }) => {
  const { boxList, boxAdd, form, rules, availableBox } =
    useUiWorkflowBoxAdd(package_UID);

  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          تعیین مواد اولیه/ محصول جعبه
        </Typography>
      </div>
      <Spin spinning={boxList.isFetching}>
        <Row gutter={[16, 12]}>
          <BoxCardAdd package_uid={package_UID} />
          <BoxCartList package_UID={package_UID} />
        </Row>
      </Spin>
    </>
  );
};
export default MaterialsBox;
