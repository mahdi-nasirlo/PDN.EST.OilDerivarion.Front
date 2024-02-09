import {Descriptions, Spin} from "antd";
import React from "react";
import {z} from "zod";
import {workflowApi} from "../../constance/workflow";


interface data {
    data: z.infer<typeof workflowApi.GetTask.response.shape.data.shape.listCalendar> | undefined;
    loading?: boolean;
}

const CalendarTime: React.FC<data> = ({data, loading}) => {
    if (loading) {
        return <Spin/>;
    }

    return (
        <>
            {data && (
                <div className="p-4">
                    <Descriptions
                        className="text-right text-secondary-500"
                        title="تاریخ های مجاز"
                    >
                        {data.map((item, index) => (<Descriptions.Item key={index} label="تاریخ">
                            {item.solar_fulldate}
                        </Descriptions.Item>))}
                    </Descriptions>
                </div>
            )}
        </>
    );
};

export default CalendarTime;
