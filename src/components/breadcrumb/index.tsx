"use client";

import React, { CSSProperties } from "react";
import { Button, Divider } from "antd";
import { Breadcrumb, Typography } from "antd/lib";

type TProps = {
  style?: CSSProperties;
  className?: string;
  pages: Array<{
    path?: string;
    label: string;
  }>;
  currentPage: string;
  showTitle?: boolean;
  backLink?: string;
  titleIcon?: React.ReactNode;
  title?: string;
};

const Index = (props: TProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          {props.pages.map((item, index) => (
            <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>{props.currentPage}</Breadcrumb.Item>
        </Breadcrumb>

        {props.backLink && (
          <Button size="large" href={props.backLink}>
            بازگشت
          </Button>
        )}
      </div>
      <Divider />
      {(props.showTitle ?? true) && (
        <div className="flex justify-start">
          {props.titleIcon && (
            <Button
              className="ml-4 flex items-center justify-center"
              size="large"
              shape="circle"
              type="primary"
            >
              {props.titleIcon}
            </Button>
          )}
          <Typography className="mb-7 font-normal text-3xl">
            {props?.title || props.currentPage}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Index;
