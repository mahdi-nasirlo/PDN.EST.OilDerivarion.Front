"use client";

import { Spin } from "antd";
import { useSession } from "next-auth/react";
import React from "react";

export const RedirectInClient = () => {
  const session = useSession();
  window.location.href = window.location.origin + "/producer";
  return <Spin>{JSON.stringify(session)}</Spin>;
};
