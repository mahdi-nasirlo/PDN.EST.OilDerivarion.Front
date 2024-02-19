"use client";

import React from "react";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Alert, Divider } from "antd";
import { Card } from "@/components/card";
import { DescriptionForm } from "@/app/(dashboard)/request/edit/[part_uid]/components/products/description-form";
import Materials from "@/app/(dashboard)/request/edit/[part_uid]/components/materials";
import Products from "@/app/(dashboard)/request/edit/[part_uid]/components/products";
import { useGetRequestPackagePartList } from "@/hooks/material/use-get-request-package-part-list";
import staticMessages from "@/lib/staticMessages";

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
          { label: "پکیج درخواست", path: "/request" },
        ]}
        backLink="/request"
        currentPage="ویرایش درخواست"
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
                      message={
                        item.Status_Message != ""
                          ? "موارد نیازمند به ویرایش"
                          : null
                      }
                      className="text-sm w-full"
                      description={item.Status_Message}
                      type="error"
                    />
                    <Divider />
                  </>
                )}
              </>
            )}
          </>
        ))
        }
        <DescriptionForm uid={part_uid} />
        <Divider />
        <Materials uid={part_uid} />
        <Divider />
        <Products uid={part_uid} />
      </Card>
    </div >
  );
}
