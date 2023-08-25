import { User } from "@/types";
import { LOGOUT, SET_USER } from "./action-types";

export const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
