import React from 'react';
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Tag} from "antd";

const StatusColumn = ({record}: { record: any }) => {
    let color = "";
    let name = "";
    let icon = <></>;
    if (record.IsActive === false) {
        color = "red";
        name = "غیرفعال";
        icon = <CloseCircleOutlined/>;
    } else {
        color = "success";
        name = "فعال";
        icon = <CheckCircleOutlined/>;
    }

    return (
        <Tag icon={icon} color={color}>
            {name}
        </Tag>
    );
};

export default StatusColumn;