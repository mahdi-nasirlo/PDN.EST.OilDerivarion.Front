import React from "react";
import TransferList from "./components/transfer";
import { Card } from "@/components/card";
import SubmitForm from "./components/submit-form";
import { Alert, Breadcrumb, Divider } from "antd";

const page = () => {
  return (
    <div>
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
