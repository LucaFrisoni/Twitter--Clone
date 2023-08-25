"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface SessionProviderNextProps {
  children: React.ReactNode;
}

const SessionProviderNext: React.FC<SessionProviderNextProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderNext;
