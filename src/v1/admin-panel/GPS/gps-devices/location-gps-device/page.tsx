"use client";

import React from "react";
import MapViewer from "../../../../../../components/MapViewer";

export default function Page() {
  return (
    <>
      <div className="box-border w-full h-[74vh] p-4">
        <MapViewer SecondReload={30} />
      </div>
    </>
  );
}
