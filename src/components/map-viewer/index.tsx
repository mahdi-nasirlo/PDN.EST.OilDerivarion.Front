"use client";

import React, { useEffect, useRef } from "react";

interface PropsType {
  SecondReload: number;
  height?: string;
  width?: string;
  className?: React.HtmlHTMLAttributes<HTMLDivElement>;
}

export default function Index(props: PropsType) {
  const iframeRef = useRef(null);

  const refreshIframe = () => {
    if (iframeRef.current) {
      (iframeRef.current as HTMLIFrameElement).src = (
        iframeRef.current as HTMLIFrameElement
      ).src;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshIframe, props.SecondReload * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      height={props.height ? props.height : "100%"}
      width={props.width ? props.width : "100%"}
      className="border-2 border-CustomizeBlue-500 rounded-md"
      src={
        process.env.NEXT_PUBLIC_MAP_LAB_URL +
        `/oil/boxonmap?device=861100068416631`
      }
    ></iframe>
  );
}
