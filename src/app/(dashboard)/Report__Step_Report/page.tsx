import React from "react";
import { Card } from "@/components/card";
import SubmitForm from "./components/submit-form";
import { Alert, Divider } from "antd";
import Breadcrumb from "@/components/breadcrumb";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const page = () => {
  return (
    <div>
      <Breadcrumb
        pages={[{ label: "خانه", path: "/" }]}
        currentPage="گزارشات مراحل"
        titleIcon={<CheckBadgeIcon />}
      />
      <Card>
        <Alert
          className="text-blue-800 text-right"
          message="ابتدا مرحله مورد نظر خود را انتخاب کرده و سپس گزارشات مربوطه را از سمت راست “ گزارشات انتخاب نشده” به سمت چپ “گزارشات انتخاب شده” انتقال دهید."
          type="info"
        />
        <Divider />

        <SubmitForm />
      </Card>
    </div>
  );
};

export default page;
