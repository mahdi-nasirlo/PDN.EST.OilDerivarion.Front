"use client";

import {Spin} from "antd";
import React from "react";

export const RedirectInClient = () => {
  window.location.href = window.location.origin + "/producer";
  return <Spin></Spin>;
};
