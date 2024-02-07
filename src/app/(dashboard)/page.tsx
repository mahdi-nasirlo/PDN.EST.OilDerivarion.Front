"use client";

import { useGetUserAccess } from "@/hooks/sso/use-get-user-access";
import Breadcrumb from "@/components/breadcrumb";
import { Card } from "@/components/card";
import { motion } from "framer-motion";
import { Alert, Spin } from "antd";


export default function Page() {

  const pages = useGetUserAccess()

  return (
    <>
      <Breadcrumb
        pages={[]}
        currentPage={"خانه"}
      />
      <Card className="flex justify-center items-center h-[67vh]">
        {(pages.isLoading || pages.isFetching) && <Spin spinning={pages.isLoading} />}
        {!pages.isFetching && (!Array.isArray(pages.data) || pages.data.length == 0) &&
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Alert type="warning" className="font-bold text-md"
              message="اشخاص حقیقی فاقد شرکت قادر به ثبت نام و استفاده از سامانه نمی باشد" />
          </motion.div>
        }
      </Card>
    </>
  );
}
