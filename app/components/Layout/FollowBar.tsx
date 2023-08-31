
import React from "react";
import Avatar from "../Avatar";
import axios from "axios";
export const revalidate = 0;
const FollowBar = async () => {





// Error: Text content does not match server-rendered HTML.

// Warning: Text content did not match. Server: "19 seconds" Client: "20 seconds"

// See more info here: https://nextjs.org/docs/messages/react-hydration-error



  const { data } = await axios.get("https://backlitter.onrender.com/users");
  const users = data;
  if (users.length === 0) {
    return null;
  }
  return (
    <div className=" px-6 py-4 hidden lg:block">
      <div className=" bg-neutral-800 rounded-xl p-4">
        <h2 className=" text-white text-xl font-semibold">Who to follow</h2>
        <div className=" flex flex-col gap-6 mt-4">
          {users.map((user: any) => (
            <div key={user._id} className=" flex flex-row gap-4">
              <Avatar userId={user._id} profileImage={user.profileImage} />
              <div className=" flex flex-col">
                <p className=" text-white font-semibold text-sm">{user.name}</p>
                <p className=" text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
