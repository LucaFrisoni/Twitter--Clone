"use client";


import ChangePasswordModal from "@/app/components/modals/ChangePasswordModal";
import EditModal from "@/app/components/modals/EditModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ProfileModal from "@/app/components/modals/ProfileModal";
import QuoteModal from "@/app/components/modals/QuoteModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  //hola
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
    <QuoteModal />
    <ProfileModal />
    </div>
  );
};

export default ModalProvider;
