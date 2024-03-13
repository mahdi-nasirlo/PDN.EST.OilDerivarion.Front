"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Alert, Divider, Typography } from "antd";
import { Card } from "@/components/card";
import { DescriptionForm } from "@/app/(dashboard)/request/edit/[part_uid]/components/products/description-form";
import Materials from "@/app/(dashboard)/request/edit/[part_uid]/components/materials";
import Products from "@/app/(dashboard)/request/edit/[part_uid]/components/products";
import { useGetRequestPackagePartList } from "@/hooks/material/use-get-request-package-part-list";
import staticMessages from "@/lib/staticMessages";
import { WarningFilled } from "@ant-design/icons";
import useRequestPackageInfo from "@/hooks/material/use-request-package-part-info";
import { Tag } from "antd/lib";


interface TProps {
  params: { part_uid: string; package_uid: string };
}

export default function Page({ params: { part_uid, package_uid } }: TProps) {
  const packagePart = useGetRequestPackagePartList();
  const requestInfo = useRequestPackageInfo(part_uid);

  return (
    <div>
      <Breadcrumb
        pages={[
          { label: "خانه", path: "/" },
          { label: "پکیج درخواست", path: "/request" },
        ]}
        backLink="/request"
        currentPage="ویرایش درخواست"
        titleIcon={<DocumentPlusIcon className="w-8" />}
        extera={[
          <>
            {requestInfo.data?.Part_Type && (
              <div className="flex justify-between items-center">
                <Typography key={1}>روش تولید:</Typography>
                <Tag color="blue-inverse" className="mx-2 px-2 p-1">
                  {
                    ["برش", "بلندینگ", "پیرولیز", "شیرین سازی", "کرکینگ"][
                    requestInfo.data?.Part_Type - 1
                    ]
                  }
                </Tag>
              </div>
            )}
          </>,
        ]}
      />
      <Card>
        <Alert
          className="border-none w-full text-right text-base font-normal text-CustomizeBlue-500 mb-6"
          message={staticMessages.formAlert}
          type="info"
        />
        {packagePart.data?.map((item, index) => (
          <>
            {item.UID == part_uid && (
              <>
                {item.Status_Message != "" && (
                  <>
                    <Divider />
                    <Alert
                      showIcon
                      type="error"
                      className="text-sm w-full text-red-500"
                      icon={
                        <WarningFilled
                          width={24}
                          height={24}
                          className="text-red-500"
                        />
                      }
                      message={
                        <Typography className="font-bold text-lg text-red-500">
                          {item.Status_Message != ""
                            ? "موارد نیازمند به ویرایش"
                            : null}
                        </Typography>
                      }
                      description={item.Status_Message.split("-")
                        .slice(1)
                        .map((part, index) => (
                          <span key={index}>
                            {index > 0 && <br />}
                            {"- "}
                            {part.trim()}
                          </span>
                        ))}
                    />
                    <Divider />
                  </>
                )}
              </>
            )}
          </>
        ))}
        <DescriptionForm uid={part_uid} />
        <Divider />
        <Materials uid={part_uid} />
        <Divider />
        <Products uid={part_uid} />
      </Card>
    </div>
  );
}
