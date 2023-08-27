import React from "react";
import Image from "next/image";
import Avatar from "../Avatar";

interface UserHeroProps {
  user: any;
}

const UserHero: React.FC<UserHeroProps> = async ({ user }) => {
  return (
    <div className="">
      <div className=" bg-neutral-700 h-44 relative">
        {user?.user.coverImage && (
          <Image
            src={user.user.coverImage}
            fill
            alt="cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className=" absolute -bottom-16 left-4">
          <Avatar
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
