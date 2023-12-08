"use client";
import React from "react";
import Image from "next/image";
import Avatar from "../Avatar";
import useProfileModel from "@/hooks/zustandHooks/useProfileModal";

interface UserHeroProps {
  user: any;
}

const UserHero: React.FC<UserHeroProps> = ({ user }) => {
  const { onOpen } = useProfileModel();

  return (
    <div className="">
      <div className=" bg-neutral-700 h-44 relative">
        {user?.user.coverImage && (
          <Image
            src={user.user.coverImage}
            fill
            alt="cover image"
            style={{ objectFit: "cover" }}
            onClick={()=>{onOpen(user.user.coverImage || "/images/Noimage.jpg")}}
          />
        )}
        <div className=" absolute -bottom-16 left-4">
          <Avatar
            Zoom
            profileImage={user?.user.profileImage}
            userId={user?.user._id}
            isLarge
            hasborder
            flag={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
