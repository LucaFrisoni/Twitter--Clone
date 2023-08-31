"use client";


import ChangePasswordModal from "@/app/components/modals/ChangePasswordModal";
import EditModal from "@/app/components/modals/EditModal";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
    <LoginModal />
    <RegisterModal />
    <EditModal />
    <ChangePasswordModal />
    </div>
  );
};

export default ModalProvider;
