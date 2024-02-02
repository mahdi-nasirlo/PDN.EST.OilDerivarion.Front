import React from 'react';
import {Typography} from "antd";

const CustomHeader = (props: {
    icon?: React.ReactNode;
    text: string
    actions?: React.ReactNode
}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <Typography className="flex items-center gap-2 text-right text-[16px] font-bold mr-2">
                {props.icon && (
                    <span className="text-gray-900 w-8 h-8">{props.icon}</span>
                )}
                {props.text}
            </Typography>
            {props.actions}
        </div>
    );
};

export default CustomHeader;