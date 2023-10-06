"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsTwitter } from "react-icons/bs";

interface SidebarLog {
  toggleSheet?: any;
  mobile?: boolean;
}

const Sidebarlogo = ({ toggleSheet, mobile }: SidebarLog) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (mobile) {
          toggleSheet();
        }

        router.push("/");
      }}
      className=" 
    rounded-full
    h-14
    w-14
    p-4
    flex
    items-center
    justify-center
    hover:bg-blue-300
    hover:bg-opacity-10
    cursor-pointer
    transition"
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default Sidebarlogo;
