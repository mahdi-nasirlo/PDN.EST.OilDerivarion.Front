import { Col, Row } from "antd";
import React from "react";
import CustomRadioGroup from "../../../../../../../components/CustomeRadioGroup";

export default function EditForm({ data, form }: { data: any; form: any }) {

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            label="تقطیر اتمسفریک"
            name={"lab_HasAtmosphericDistillation"}
            value={form.getFieldValue("lab_HasAtmosphericDistillation")}
            onChange={(e: any) =>
              form.setFieldsValue({
                lab_HasAtmosphericDistillation: e.target.value,
              })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasVacuumDistillation"
            label="تقطیر در خلاء"
            value={form.getFieldValue("lab_HasVacuumDistillation")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasVacuumDistillation: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasPourPoint"
            label="نقطه ریزش"
            value={form.getFieldValue("lab_HasPourPoint")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasPourPoint: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasFlashPoint"
            label="نقطه اشتعال"
            value={form.getFieldValue("lab_HasFlashPoint")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasFlashPoint: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasViscometer"
            label="ویسکومتر"
            value={form.getFieldValue("lab_HasViscometer")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasViscometer: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasMetalCorrosion"
            label="خوردگی تیغه مسی"
            value={form.getFieldValue("lab_HasMetalCorrosion")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasMetalCorrosion: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasTBN"
            label="TBN (تست قلیایی)"
            value={form.getFieldValue("lab_HasTBN")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasTBN: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasTAN"
            label="TAN (تست اسیدی)"
            value={form.getFieldValue("lab_HasTAN")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasTAN: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasMeasureMocaptan"
            label="اندازه گیری مقدار مرکاپتان"
            value={form.getFieldValue("lab_HasMeasureMocaptan")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasMeasureMocaptan: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasMeasureSulfur"
            label="اندازه گیری مقدار گوگرد"
            value={form.getFieldValue("lab_HasMeasureSulfur")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasMeasureSulfur: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasDensiometer"
            label="دانسیومتر"
            value={form.getFieldValue("lab_HasDensiometer")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasDensiometer: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasMeasureColor"
            label="اندازه گیری رنگ"
            value={form.getFieldValue("lab_HasMeasureColor")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasMeasureColor: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomRadioGroup
            data={data}
            name="lab_HasMeasureMethodGC"
            label="درصد آروماتیک و بنزن به روش GC"
            value={form.getFieldValue("lab_HasMeasureMethodGC")}
            onChange={(e: any) =>
              form.setFieldsValue({ lab_HasMeasureMethodGC: e.target.value })
            }
            options={[
              { label: "دارد", value: true },
              { label: "ندارد", value: false },
            ]}
          />
        </Col>
      </Row>
    </>
  );
}
