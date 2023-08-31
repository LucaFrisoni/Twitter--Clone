"use client";
import React from "react";
import Header from "../components/Header";


import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
const NotificationsFeed = dynamic(
  () => import("../components/NotificationsFeed"),
  {
    ssr: false,
    loading: () => (
      <div className=" flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    ),
  }
);



const NotificationsView = () => {


  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default NotificationsView;
