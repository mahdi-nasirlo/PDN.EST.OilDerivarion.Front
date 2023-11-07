"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { addIndexToData } from "../../../../lib/addIndexToData";
import { listFetcher } from "../../../../lib/server/listFetcher";

export default function Home() {
  return (
    <>
      <div className="box-border w-full mt-8 p-6"></div>
    </>
  );
}
