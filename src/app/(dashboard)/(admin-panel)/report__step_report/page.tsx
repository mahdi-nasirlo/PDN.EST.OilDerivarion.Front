import React from "react";
import { Card } from "@/components/card";
import SubmitForm from "./components/submit-form";
import { Alert, Divider } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

const page = () => {
  return (
    <div>
      <Breadcrumb
        pages={[{ label: "خانه", path: "/" }]}
        currentPage="گزارشات مراحل"
        titleIcon={<DocumentTextIcon className="w-8" />}
      />
      <Card>
        <Alert
          className="text-blue-800 text-right"
          message="ابتدا مرحله مورد نظر خود را انتخاب کرده و سپس با استفاده از ستون سمت راست   “گزارشات انتخاب نشده”   بخش های مورد نظر را به ستون سمت چپ   “گزارشات انتخاب شده”   انتقال دهید."
          type="info"
        />
        <Divider />

        <SubmitForm />
      </Card>
    </div>
  );
};

export default page;
