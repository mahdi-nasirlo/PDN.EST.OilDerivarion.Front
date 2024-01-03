"use client";

import React from "react";
import {Button, Typography} from "antd";
import {ButtonProps} from "antd";
import Link, {LinkProps} from "next/link";

interface Data {
    CanEdit:boolean,
    children: React.ReactNode
}
const VisitInfo = (props:Data & LinkProps) => {
    console.log(props)
return(
    <>
        {props.CanEdit ? <>
          <Link className="text-secondary-500 font-bold" href={props.href}>{props.children}</Link>
        </> : <>
            <span className="font-bold" style={{color: "gray"}}>{props.children}</span>
        </>}
    </>
)
}
export default VisitInfo;
