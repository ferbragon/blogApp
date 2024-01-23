"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { IPropsRedux } from "@/types/types";

function Providers({ children }: IPropsRedux) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
