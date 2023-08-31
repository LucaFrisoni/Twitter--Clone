"use client";
import React, { useMemo } from "react";
import Header from "../components/Header";
import StaticksView from "../components/StaticksView";
export const revalidate = 1
const StadisticsVieww = () => {
  return (
    <>
      <Header label="Stadistics" showBackArrow />
      <StaticksView />
    </>
  );
};

export default StadisticsVieww;
