import React, {useState} from 'react';
import {z} from "zod";
import {Alert, Collapse, Empty, Spin, Typography} from "antd";
import useProducerFormsGetDocSchemaByUid from "@/hooks/form-maker/use-producer-forms-get-doc-schema-by-UID";
import DataViewer from "@/components/form-builder/data-viewer";
import {materialApi} from "../../constance/material";

const Index = ({reports, loading}: {
    reports: z.infer<typeof materialApi.GetRegisteredReportsForStepByKey.item>[] | undefined,
    loading?: boolean
}) => {

    if (loading)
        return <Spin/>

    if (!Array.isArray(reports))
        return

    return reports?.map((repost, index) => <RenderRepost key={index} index={index} report={repost}/>)
};

const RenderRepost = ({report, index}: {
    index: number,
    report: z.infer<typeof materialApi.GetRegisteredReportsForStepByKey.item>
}) => {

    const [isFirst, setIsFirst] = useState(index === 0)

    let ItemType

    if (report.UID) {
        switch (report.Form_Type) {
            // case 1:
            //     ItemType = <WorkflowDataViewer data={data}/>
            //     break;
            case 2:
                ItemType = <RenderTypeTow formKey={report.Form_Key} formUid={report.UID}/>
                break;
            // case 3:
            //     ItemType = <MediaTypeItems data={data}/>
            //     break;
            default:
                ItemType = <Typography>نوع دیتا پشتیبانی نمیشود</Typography>
        }
    } else {
        ItemType = <Alert type="error" message="این بخش از اطلاعات پایه تولید کننده تکمیل نشده است."/>
    }

    return <>
        <Collapse
            defaultActiveKey={index === 0 ? ["0"] : []}
            onChange={key => {
                if (key.length > 0) {
                    setIsFirst(true)
                }
            }}
            style={{margin: "16px 0"}}
            className="my-3"
            size="large"
            items={[{
                label: report.Form_Name,
                children: ItemType
                // children: isLoading ? <Spin/> : <div>{data ? ItemType : <Empty/>}</div>
            }]}
        />
    </>
}

const RenderTypeTow = ({formKey, formUid}: { formKey: string, formUid: string }) => {

    const schema = useProducerFormsGetDocSchemaByUid({form_Key: formKey, form_UID: formUid})

    if (schema.isFetching)
        return <Spin/>

    if (!schema.data)
        return <Empty/>

    return <Spin spinning={schema.isFetching}><DataViewer data={schema.data[0].form_data}
                                                          schema={schema.data[0].Schema_Data}/></Spin>
}
export default Index;