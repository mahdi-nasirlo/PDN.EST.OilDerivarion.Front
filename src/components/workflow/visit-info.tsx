"use client";

import React from "react";
import Link, {LinkProps} from "next/link";

interface Data {
  CanEdit: boolean;
  children: React.ReactNode;
}
const VisitInfo = (props: Data & LinkProps) => {

  return (
    <>
      {props.CanEdit ? (
        <>
          <Link className="text-secondary-500 font-bold" href={props.href}>
            {props.children}
          </Link>
        </>
      ) : (
        <>
          <span
            className="font-bold"
            style={{ color: "#9ca3af", cursor: "default" }}
          >
            {props.children}
          </span>
        </>
      )}
    </>
  );
};
export default VisitInfo;
