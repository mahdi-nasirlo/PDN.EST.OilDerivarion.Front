import useRequestPackageMaterialList from "@/hooks/material/use-request-package-material-list";
import { Col, Form, Row, Select } from "antd";
import React from "react";
import { Rule } from "rc-field-form/es/interface";
import PercentageInput from "@/components/inputs/percentage-input";
import useMaterialDDlList from "@/hooks/request-package/use-material-list-ddl";
import { filterOption } from "@/lib/filterOption";

export default function MaterialForm({
  rules,
  package_uid,
  partUid,
}: {
  rules: Rule;
  package_uid?: string;
  partUid: string;
}) {
  const MaterialPackage = useRequestPackageMaterialList({
    package_UID: package_uid,
  });
  const materialsDdl = useMaterialDDlList({
    part_UID: partUid,
    package_UID: package_uid,
  });

  return (
    <Row gutter={[16, 10]}>
      <Col xs={24} sm={12}>
        <Form.Item name="material_UID" label="نام مواد اولیه" rules={[rules]}>
          <Select
            showSearch
            size="large"
            placeholder="انتخاب کنید"
            filterOption={filterOption}
            options={materialsDdl.options}
            loading={materialsDdl.isLoading}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12}>
        <Form.Item name="darsad_Estefadeh" label="درصد استفاده" rules={[rules]}>
          <PercentageInput />
        </Form.Item>
      </Col>
    </Row>
  );
}
