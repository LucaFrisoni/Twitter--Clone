// import Header from "@/app/components/Header";

// import axios from "axios";
// import dynamic from "next/dynamic";
// import React from "react";
// import { ClipLoader } from "react-spinners";

// const UserHero = dynamic(() => import("@/app/components/users/UserHero"), {
//   ssr: false,
//   loading: () => (
//     <div className=" flex justify-center items-center h-full">
//       <ClipLoader color="lightblue" size={80} />
//     </div>
//   ),
// });
// const UserBio = dynamic(() => import("@/app/components/users/UserBio"), {
//   ssr: false,
//   loading: () => (
//     <div className=" flex justify-center items-center h-full">
//       <ClipLoader color="lightblue" size={80} />
//     </div>
//   ),
// });
// const PostFeed = dynamic(() => import("@/app/components/posts/PostFeed"), {
//   ssr: false,
//   loading: () => (
//     <div className=" flex justify-center items-center">
//       <ClipLoader color="lightblue" size={80} />
//     </div>
//   ),
// });

// export const revalidate = 0;
// const UserView = async ({
//   params: { userId },
// }: {
//   params: { userId: string };
// }) => {
//   const { data } = await axios.get(
//     `https://backlitter.onrender.com/users/${userId}`
//   );
//   const user = data;
//   const { data: userPostsData } = await axios.get(
//     `https://backlitter.onrender.com/posts?userId=${userId}`
//   );
//   if (!user) {
//     return (
//       <div className=" flex justify-center items-center h-full">
//         <ClipLoader color="lightblue" size={80} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header showBackArrow label={user?.user.name} />
//       <UserHero user={user} />
//       <UserBio user={user} />
//       <PostFeed
//         dataUserId={userPostsData}
//         userView={true}

//       />
//     </>
//   );
// };

// export default UserView;

"use client";
import Header from "@/app/components/Header";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";
const UserHero = dynamic(() => import("@/app/components/users/UserHero"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});
const UserBio = dynamic(() => import("@/app/components/users/UserBio"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});
const PostFeed = dynamic(() => import("@/app/components/posts/PostFeed"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});

const UserView = () => {
  const { userId } = useParams();
  // Declara las variables con tipos iniciales

  const [userPostsData, setuserPostsData] = useState<any>(null);
  const [user, setuser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://backlitter.onrender.com/users/${userId}`
      );
      setuser(data);
      const { data: postsData } = await axios.get(
        `https://backlitter.onrender.com/posts?userId=${userId}`
      );
      setuserPostsData(postsData);
      setLoading(false); // Asigna el valor a userPostsData
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header showBackArrow label={user?.user.name} />
      <UserHero user={user} />
      <UserBio user={user} />
      <PostFeed dataUserId={userPostsData} onRefresh={fetchData} />
    </>
  );
};

export default UserView;
