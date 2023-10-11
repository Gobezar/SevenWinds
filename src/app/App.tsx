import React from "react";
import { ReduxProvider } from "./store/provider";
import { MainPage } from "../pages/MainPage";
import "./styles/global.sass";

export function App() {
  return (
    <ReduxProvider>
      <MainPage />
    </ReduxProvider>
  );
}
