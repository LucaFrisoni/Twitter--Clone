// Sends the session's API token with every backend request and ends sessions the API rejects.
"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const ApiAuth = () => {
  const { data: session } = useSession();
  const apiToken = session?.apiToken;

  useEffect(() => {
    if (apiToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${apiToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [apiToken]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(undefined, (error) => {
      if (error.response?.status === 401) signOut();
      return Promise.reject(error);
    });
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return null;
};

export default ApiAuth;
