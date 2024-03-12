import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { Alert, Collapse, Empty, Spin, Typography } from "antd";
import useProducerFormsGetDocSchemaByUid from "@/hooks/form-maker/use-producer-forms-get-doc-schema-by-UID";
import DataViewer from "@/components/form-builder/data-viewer";
import { RequestPackageApi } from "constance/request-package";
import WorkflowDataViewer from "@/components/workflow/WorkflowDataViewer";
import { CheckIcon } from "@heroicons/react/24/outline";
import { WorkflowContext } from "@/providers/workflow-provider";
import { Card } from "@/components/card";

const Index = ({
  reports,
  loading,
  taskId,
  setStatus,
  stepKey,
}: {
  stepKey?: string | undefined;
  reports:
  | z.infer<typeof RequestPackageApi.RequestPackageReportList.item>[]
  | undefined;
  loading?: boolean;
  taskId?: string;
  setStatus?: (arg: []) => void;
}) => {
  if (loading) return <Spin />;

  if (!Array.isArray(reports)) return;

  return (
    <>
      <Alert
        className="font-medium text-amber-600"
        type="warning"
        message="به منظور فعال شدن مرحله فعلی باید تمام گزارشات مندرج در صفحه مشاهده و بررسی گردد"
      />
      {reports?.map((report, index) => (
        <RenderReport
          key={index}
          index={index}
          stepKey={stepKey}
          report={report}
          taskId={taskId}
          setStatus={setStatus}
        />
      ))}
    </>
  );
};

const RenderReport = ({
  report,
  index,
  taskId,
  stepKey,
}: {
  index: number;
  taskId?: string;
  stepKey?: string;
  report: z.infer<typeof RequestPackageApi.RequestPackageReportList.item>;
  setStatus?: (arg: []) => void;
}) => {
  const { value, setValue } = useContext(WorkflowContext);

  let ItemType;

  if (report.UID) {
    switch (report.Form_Type) {
      case 1:
        ItemType = (
          <RenderTypeOne
            formKey={report.Form_Key}
            formUid={report.UID}
            taskId={taskId}
          />
        );
        break;
      case 2:
        ItemType = (
          <Card className="bg-gray-100">
            <RenderTypeTow
              formKey={report.Form_Key}
              formUid={report.UID}
              taskId={taskId}
            />
          </Card>
        );
        break;
      // case 3:
      //     ItemType = <MediaTypeItems data={data}/>
      //     break;
      default:
        ItemType = <Typography>نوع دیتا پشتیبانی نمیشود</Typography>;
    }
  } else {
    ItemType = (
      <Alert
        type="error"
        message="این بخش از اطلاعات پایه تولیدکننده تکمیل نشده است."
      />
    );
  }

  const lcKey = `${stepKey}_${taskId}`;

  let existHistory = (): any[] => {
    const lc = localStorage.getItem(lcKey);

    try {
      if (lc) {
        const json = JSON.parse(lc);

        if (z.array(z.string()).safeParse(json).success) {
          return json;
        }

        return [];
      }

      return [];
    } catch (e) {
      console.log(e);

      return [];
    }
  };

  useEffect(() => saveStatusHistory(index === 0 ? ["0"] : undefined), []);

  const [historyState, setHistoryState] = useState<string[]>(existHistory());

  const saveStatusHistory = (e?: string | string[]) => {
    let history: any[] = [];

    history = history.concat(existHistory());

    if (e && history && !history.includes(report.Form_Key))
      history.push(report.Form_Key);

    setHistoryState(history);

    setValue({ ...value, [lcKey]: history });

    localStorage.setItem(lcKey, JSON.stringify(history));
  };

  const genExtra = () =>
    historyState.find((item) => item == report.Form_Key) && (
      <CheckIcon className="w-8 text-primary-500" />
    );

  return (
    <>
      <Collapse
        defaultActiveKey={index === 0 ? ["0"] : []}
        style={{ margin: "16px 0" }}
        className="my-3"
        size="large"
        onChange={saveStatusHistory}
        items={[
          {
            label: report.Form_Name,
            children: ItemType,
            extra: genExtra(),
          },
        ]}
      />
    </>
  );
};

interface PropType {
  formKey: string;
  formUid: string;
  taskId?: string;
}

const RenderTypeOne = ({ taskId, formUid, formKey }: PropType) => {
  const schema = useProducerFormsGetDocSchemaByUid({
    form_Key: formKey,
    form_UID: formUid,
    taskId: taskId,
  });

  if (schema.isFetching) return <Spin />;

  // if (!schema.data?.length) return <Empty/>

  return <WorkflowDataViewer data={schema.data?.form_data} />;
};

export const RenderTypeTow = ({ formKey, formUid, taskId }: PropType) => {
  const schema = useProducerFormsGetDocSchemaByUid({
    form_Key: formKey,
    form_UID: formUid,
    taskId: taskId,
  });

  if (schema.isFetching) return <Spin />;

  if (!schema.data) return <Empty />;

  return (
    <Spin spinning={schema.isFetching}>
      <DataViewer
        data={schema.data.form_data}
        schema={schema.data.Schema_Data}
      />
    </Spin>
  );
};
export default Index;
