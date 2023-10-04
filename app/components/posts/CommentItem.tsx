"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();
  console.log("Data =>", data);
  const goToUser = useCallback(
    (event: any) => {
      // detiene el onclick del padre
      event.stopPropagation();
      router.push(`/users/${data.userId?._id}`);
    },
    [router, data.userId?._id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className=" bg-neutral-900 border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-800 transition">
      <div className=" flex flex-row items-start gap-3">
        <Avatar
          profileImage={data.userId?.profileImage}
          userId={data.userId?._id}
        />
        <div>
          <div className=" flex flex-row items-center gap-2 ">
            <p className=" text-white font-semibold cursor-pointer hover:underline">
              {data.userId?.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-400  cursor-pointer hover:underline hidden md:block "
            >
              @{data.userId?.username}
            </span>
            <span className=" text-neutral-500 text-sm ">{createdAt}</span>
          </div>
          <div className=" text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
