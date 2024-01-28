import Image, { ImageProps } from "next/image";
import React from "react";

export const SvgIcon = (props: { width?: number, height?: number } & ImageProps) => (
    <Image
        {...props}
        alt={props.alt ?? "icon"}
        className={props.className}
        height={props.width ?? 16}
        width={props.width ?? 16}
    />
);