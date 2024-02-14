import React from 'react';
import {z} from "zod";
import {Alert, Collapse, Empty, Spin, Typography} from "antd";
import useProducerFormsGetDocSchemaByUid from "@/hooks/form-maker/use-producer-forms-get-doc-schema-by-UID";
import DataViewer from "@/components/form-builder/data-viewer";
import {materialApi} from "../../constance/material";
import WorkflowDataViewer from "../../../components/Workflow/WorkflowDataViewer";

const Index = ({reports, loading, taskId}: {
  reports: z.infer<typeof materialApi.GetRegisteredReportsForStepByKey.item>[] | undefined,
  loading?: boolean,
  taskId: string
}) => {
  if (loading) return <Spin />;

  if (!Array.isArray(reports)) return;

  return reports?.map((repost, index) => (
      <RenderRepost key={index} index={index} report={repost} taskId={taskId}/>
  ));
};

const RenderRepost = ({
                        report,
                        index,
                        taskId
}: {
  index: number;
  taskId: string,
  report: z.infer<typeof materialApi.GetRegisteredReportsForStepByKey.item>;
}) => {

  let ItemType;

  if (report.UID) {
    switch (report.Form_Type) {
        case 1:
            ItemType = <WorkflowDataViewer form_Key={report.Form_Key} uid={report.UID} package_Uid={taskId}/>
            break;
      case 2:
          ItemType = <RenderTypeTow formKey={report.Form_Key} formUid={report.UID} taskId={taskId}/>;
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
        message="این بخش از اطلاعات پایه تولید کننده تکمیل نشده است."
      />
    );
  }

  return (
    <>
      <Collapse
        defaultActiveKey={index === 0 ? ["0"] : []}
        style={{ margin: "16px 0" }}
        className="my-3"
        size="large"
        items={[
          {
            label: report.Form_Name,
            children: ItemType,
            // children: isLoading ? <Spin/> : <div>{data ? ItemType : <Empty/>}</div>
          },
        ]}
      />
    </>
  );
};

const RenderTypeTow = ({
                         formKey,
                         formUid,
                         taskId
                       }: {
  formKey: string;
  formUid: string;
  taskId: string
}) => {

    const schema = useProducerFormsGetDocSchemaByUid({
        form_Key: formKey,
        form_UID: formUid,
        taskId: taskId
    });

  if (schema.isFetching) return <Spin/>;

  if (!schema.data) return <Empty/>;

  return (
      <Spin spinning={schema.isFetching}>
        <DataViewer
            data={schema.data[0]?.form_data}
            schema={schema.data[0]?.Schema_Data}
        />
      </Spin>
  );
};
export default Index;
