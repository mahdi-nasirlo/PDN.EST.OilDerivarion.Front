"use client";

import React, { useEffect } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";
import useBasicMaterial from "./hook/use-basic-material";
import MultipleSelect from "@/components/multiple-select";

function MaterialForm() {
  const { testItem, measure, get } = useBasicMaterial();
  const [form, rules] = useValidation(
    materialApi.BasicProductMaterialCreate.type
  );

  return <></>;
}

export default MaterialForm;
