"use client";

import React, { CSSProperties } from "react";
import { Button, Divider } from "antd";
import { Breadcrumb, Typography } from "antd/lib";
import Link from "next/link";

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
  actions?: React.ReactNode[];
  title?: string;
  extera?: React.ReactNode;
};

const Index = (props: TProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb className="cursor-default">
          {props.pages.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {item.path ? (
                <Link href={item.path}>{item.label}</Link>
              ) : (
                item.label
              )}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>{props.currentPage}</Breadcrumb.Item>
        </Breadcrumb>

        {props.actions?.map((item) => item)}
        {props.backLink && (
          <Link href={props.backLink} className="flex">
            <Button size="large">بازگشت</Button>
          </Link>
        )}
      </div>
      <Divider />
      {(props.showTitle ?? true) && (
        <div className="flex justify-between items-center my-5 cursor-default">
          <div className="flex items-center">
            {props.titleIcon && (
              <div className="ml-4 flex items-center justify-center bg-CustomizeBlue-500 rounded-full w-11 h-11">
                {props.titleIcon}
              </div>
            )}
            <Typography className="font-normal text-right max-md:text-2xl text-3xl">
              {props?.title || props.currentPage}
            </Typography>
          </div>
          <div>{props.extera}</div>
        </div>
      )}
    </div>
  );
};

export default Index;
