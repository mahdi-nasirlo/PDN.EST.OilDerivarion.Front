"use client";

import { useGetUserAccess } from "@/hooks/sso/use-get-user-access";
import Breadcrumb from "@/components/breadcrumb";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Card } from "@/components/card";
import { motion } from "framer-motion";
import { Alert, Spin } from "antd";
import ProductCodePieChart from "@/components/widget/product-code-pie-chart";
import PriceTypePieChart from "@/components/widget/price-type-pie-chart";
import ProductCodeBarChart from "@/components/widget/product-code-bar-chart";

export default function Page() {

  const pages = useGetUserAccess();

  return (
    <>
      <Breadcrumb
        pages={[]}
        currentPage={"خانه"}
        titleIcon={<HomeIcon className="w-8" />}
      />
      {(pages.isLoading || pages.isFetching) && <Card><Spin spinning={pages.isLoading} /></Card>}
      {!pages.isFetching && (!Array.isArray(pages.data) || pages.data.length == 0) ? <Card className="flex justify-center items-center h-[66vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Alert
            type="warning"
            className="font-bold text-md w-full"
            message="اشخاص حقیقی فاقد شرکت،  قادر به ثبت نام و استفاده از سامانه نمی باشد" />
        </motion.div>
      </Card> :
        <>
          <div>
            <Card>
              <div className="col-span-12">
                <div className="flex items-center">
                  <ProductCodeBarChart className='max-h-[500px]' />
                </div>
              </div>
            </Card>
          </div>
          <div className="flex max-lg:gap-0 gap-6 w-full">
            <Card className="w-1/2">
              <div>
                <ProductCodePieChart className='max-h-[500px]' />
              </div>
            </Card>
            <Card className="w-1/2">
              <div>
                <PriceTypePieChart className='max-h-[500px]' />
              </div>
            </Card>
          </div>
        </>
      }
    </>
  );
}
