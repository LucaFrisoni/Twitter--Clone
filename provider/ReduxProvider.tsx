"use client"
import store from "@/redux/store";
import { Provider } from "react-redux";

interface ReduxProp {
  children: React.ReactNode;
}
export function ProviderRedux({ children }: ReduxProp) {
  return <Provider store={store}>{children}</Provider>;
}
