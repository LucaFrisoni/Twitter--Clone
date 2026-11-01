"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import ApiAuth from "./ApiAuth";

interface SessionProviderNextProps {
  children: React.ReactNode;
}

const SessionProviderNext: React.FC<SessionProviderNextProps> = ({
  children,
}) => {
  return (
    <SessionProvider>
      <ApiAuth />
      {children}
    </SessionProvider>
  );
};

export default SessionProviderNext;
