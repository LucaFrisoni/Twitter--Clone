"use client";
import useProfileModel from "@/hooks/zustandHooks/useProfileModal";
import React from "react";
import Modal from "../Modal";
import ReactPanZoom from "react-image-pan-zoom-rotate";

const ProfileModal = () => {
  const profileModal = useProfileModel();

  const bodyContent = (
    <div className="flex items-center justify-center max-w-[80%] max-h-[500px]  overflow-hidden m-auto">
      <ReactPanZoom image={profileModal.image} />
    </div>
  );

  return (
    <Modal
      isOpen={profileModal.isOpen}
      onClose={profileModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
    />
  );
};

export default ProfileModal;
