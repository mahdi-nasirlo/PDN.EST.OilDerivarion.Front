"use client";
import React, { useEffect, useRef } from "react";

interface PropsType {
  SecondReload: number;
}
export default function Index(props: PropsType) {
  const iframeRef = useRef(null);

  // Function to refresh the iframe
  const refreshIframe = () => {
    if (iframeRef.current) {
      (iframeRef.current as HTMLIFrameElement).src = (
        iframeRef.current as HTMLIFrameElement
      ).src;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshIframe, props.SecondReload * 1000); // 10 seconds in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <iframe
      style={{ marginBottom: 10 }}
      ref={iframeRef}
      height={"100%"}
      className="w-full h-full border-solid"
      src={
        `https://map.pdnsoftware.ir/oil/boxonmap?device=C8A4E7DB-5783-4CEB-8DF0-C0EC1BF0C5DA`
        // process.env.MAP_BOX_URL +
        // `/oil/boxonmap?device=C8A4E7DB-5783-4CEB-8DF0-C0EC1BF0C5DA`
      }
    ></iframe>
  );
}
