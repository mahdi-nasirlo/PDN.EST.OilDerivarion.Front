import React from 'react';
import { CheckCircleOutlined, ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const WorkFlowStatusColumn = ({ record }: { record: any }) => {
    let color = "";
    let name = "";
    let icon = <></>;
    if (record.status === 0) {
        color = "red";
        name = "بررسی نشده";
        icon = <InfoCircleOutlined />;
    } else if (record.status === 1) {
        color = "warning";
        name = "در حال بررسی";
        icon = <ClockCircleOutlined />;
    } else {
        color = "success";
        name = "بررسی شده";
        icon = <CheckCircleOutlined />;
    }

    return (
        <Tag icon={icon} color={color}>
            {name}
        </Tag>
    );
};

export default WorkFlowStatusColumn;