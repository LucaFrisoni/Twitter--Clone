import React from "react";
import Sidebar from "./Layout/Sidebar";
import FollowBar from "./Layout/FollowBar";

interface LayoutProps {
  children: React.ReactNode;
}

export const revalidate = 0;
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" h-screen bg-black">
      <div className=" container h-full mx-auto xl:px-30 max-w-6xl">
        <div className=" grid grid-cols-4 h-full">
          <Sidebar></Sidebar>
          <div className=" col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 max-h-[vh] overflow-y-auto hideslidder">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
