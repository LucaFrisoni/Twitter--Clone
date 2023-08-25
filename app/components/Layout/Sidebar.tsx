"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut, useSession } from "next-auth/react";

import { User } from "@/types";
import { useUserEmail } from "@/hooks/useUser";

import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "@/redux/actions";
import axios from "axios";

const Sidebar = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const [user, setUserr] = useState<User | null>(null);
    const fetchUser = useCallback(async () => {
      if (session) {
        const { data } = await axios.get(
          `/api/users/email/${session?.user?.email}`
        );
        const user = data;
        setUserr(user);
        dispatch(setUser(user));
      }
    }, [session, dispatch]);

    useEffect(() => {
      fetchUser(); // Llamamos a la función aquí dentro del useEffect
    }, [fetchUser]);

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: user?.hasNotification,
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${user?.id}`,
      auth: true,
    },
  ];

  const handleLogOut = () => {
    signOut();
    dispatch(logout());
  };

  return (
    <div className=" col-span-1 h-full pr-4 md:pr-6">
      <div className=" flex flex-col items-end">
        <div className=" space-y-2 lg:w-[230px] ">
          <Sidebarlogo />
          {items.map((nav) => (
            <SidebarItem
              key={nav.href}
              href={nav.href}
              icon={nav.icon}
              label={nav.label}
              auth={nav.auth}
              alert={nav.alert}
            />
          ))}
          {session?.user && (
            <SidebarItem
              icon={BiLogOut}
              onClick={() => handleLogOut()}
              label="logout"
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
