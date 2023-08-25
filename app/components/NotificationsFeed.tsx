"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { useSelector } from "react-redux";
export const revalidate = 0;
const NotificationsFeed = () => {
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

useEffect(() => {
  const fetchNotifications = async () => {
    if (user) {
      const { data } = await axios.get(
        `/api/notifications/${user.id}`
      );
      let notificationss = data;
      console.log(notificationss);
      setNotifications(notificationss);
    }
  };

  fetchNotifications();
}, [user]);

  if (notifications.length == 0) {
    return (
      <div className=" text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }
  return (
    <div className=" max-h-[100vh] flex flex-col overflow-y-auto hideslidder">
      {notifications.map((noti: any) => (
        <div
          key={noti.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className=" text-white">{noti.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
