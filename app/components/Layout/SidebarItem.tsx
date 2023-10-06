"use client";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  href?: string;
  icon: IconType;
  label: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
  toggleSheet?: any;
  mobile?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
  auth,
  alert,
  toggleSheet,
  mobile,
}) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const loginModal = useLoginModel();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !session) {
      return loginModal.onOpen();
    }

    if (href) {
      if (mobile) {
        toggleSheet();
      }

      return router.push(href);
    }
  }, [router, onClick, href, session, auth, loginModal]);
  return (
    <div onClick={handleClick} className=" flex flex-row items-center">
      {/* mobile */}
      <div className=" relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className=" absolute text-sky-500 -top-4 left-0" size={70} />
        ) : null}
      </div>
      {/* mobile */}
      <div className=" relative hidden lg:flex  gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className=" absolute text-sky-500 -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
