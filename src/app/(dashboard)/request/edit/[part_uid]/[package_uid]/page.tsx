"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { Card } from "@/components/card";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Alert, Divider, Typography } from "antd";
import { DescriptionForm } from "@/app/(dashboard)/request/edit/[part_uid]/components/products/description-form";
import Materials from "@/app/(dashboard)/request/edit/[part_uid]/components/materials";
import Products from "@/app/(dashboard)/request/edit/[part_uid]/components/products";
import { useGetRequestPackagePartList } from "@/hooks/material/use-get-request-package-part-list";
import staticMessages from "@/lib/staticMessages";
import { WarningFilled } from "@ant-design/icons";

interface TProps {
  params: { part_uid: string; package_uid: string };
}

export default function Page({ params: { part_uid, package_uid } }: TProps) {
  const packagePart = useGetRequestPackagePartList();

  return (
    <div>
      <Breadcrumb
        pages={[
          { label: "خانه", path: "/" },
          { label: "پکیج ثبت درخواست", path: "/request" },
        ]}
        backLink="/request"
        currentPage="ثبت درخواست"
        titleIcon={<DocumentPlusIcon className="w-8" />}
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
                      icon={<WarningFilled width={24} height={24} className="text-red-500" />}
                      message={
                        <Typography className="font-bold text-lg text-red-500">
                          {item.Status_Message != "" ? "موارد نیازمند به ویرایش" : null}
                        </Typography>
                      }
                      description={
                        item.Status_Message
                          .split('-')
                          .slice(1)
                          .map((part, index) => (
                            <span key={index}>
                              {index > 0 && <br />}
                              {'- '}
                              {part.trim()}
                            </span>
                          ))
                      }
                    />
                    <Divider />
                  </>
                )}
              </>
            )}
          </>
        ))
        }
        <DescriptionForm uid={part_uid} package_uid={package_uid} />
        <Divider />
        <Materials uid={part_uid} package_uid={package_uid} />
        <Divider />
        <Products uid={part_uid} package_uid={package_uid} />
      </Card>
    </div>
  );
}
