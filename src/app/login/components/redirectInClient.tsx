"use client";

import {Spin} from "antd";
import React, {useEffect} from "react";
import {validateToken} from "../../../../request/validateToken";

export const RedirectInClient = () => {

  useEffect(() => {

    validateToken().then((res) => {
      console.log(res)
    })

  }, []);

  // window.location.href = window.location.origin + "/producer";
  return <Spin></Spin>;
};
