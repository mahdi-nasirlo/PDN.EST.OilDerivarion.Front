"use client";

import { useGetUserAccess } from "@/hooks/sso/use-get-user-access";
import Breadcrumb from "@/components/breadcrumb";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Card } from "@/components/card";
import { motion } from "framer-motion";
import { Alert, Button, Carousel, Spin } from "antd";
import { Ref, useRef, useState } from "react";
import { CarouselRef } from "antd/es/carousel";


export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const carouselRef = useRef<Ref<CarouselRef> | undefined>(null)

  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '160px',
    color: '#fff',
    background: '#364d79',
  };

  const nextStep = () => {
    const next = (currentStep + 1) % 4;
    setCurrentStep(next);
  };

  return (
    <Card>
      {/* <Carousel ref={carouselRef} autoplay={false} dots={false}> */}
      <div>
        <h3 style={contentStyle}>fwefwef = 1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>mjhymhjmjh = 2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>qwdrefvervrt = 3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>89659045 = 4</h3>
      </div>
      {/* </Carousel> */}
      <Button onClick={nextStep}>Next</Button>
    </Card >
  );
}
