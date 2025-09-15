"use client";

import React from "react";
import ScrollLinked from "@/components/ui/ScrollLinked";
import Background from "@/components/layout/Background";
import ServicesMenu from "@/components/layout/Menu";

const HomePage: React.FC = () => {
  return (
    <>
      <Background />
      <ServicesMenu />
      <ScrollLinked />
    </>
  );
};

export default HomePage;
