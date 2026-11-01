"use client";
import React, { useMemo } from "react";
import Header from "../../components/Header";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";


const StaticksView = dynamic(() => import("../../components/Views/StaticksView"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});


const StadisticsVieww = () => {
  const { userId } = useParams();

  return (
    <>
      <Header label="Stadistics" showBackArrow />
      <StaticksView userId={userId as string}/>
    </>
  );
};

export default StadisticsVieww;
