import { FormInstance } from "antd/lib";
import React, { useEffect } from "react";

export default function SetLocation({ form }: { form: FormInstance }) {
  useEffect(() => {
    const handleMessage = async (event: any) => {
      if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
        const data: { longitude: string; latitude: string } = JSON.parse(
          event.data
        );

        form.setFieldValue("Lat", `${data.latitude}`);

        form.setFieldValue("Long", `${data.longitude}`);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <iframe
        style={{ overflow: "hidden" }}
        src={`${process.env.NEXT_PUBLIC_MAP_LAB_URL}/map/getpointfrommap?zoom=5&latitude=35.72387338825216&longitude=51.431163210478864`}
        aria-hidden="false"
        className="w-full h-[480px] border-solid"
      ></iframe>
    </>
  );
}
