import React from "react";
import { Header } from "../../../widgets/Header";
import { Navbar } from "../../../widgets/Navbar";
import { WorkingSection } from "../../../widgets/WorkingSection";
import cl from "./MainPage.module.sass";

export const MainPage = () => {
  return (
    <div>
      <Header />
      <div className={cl.mainBlock}>
        <Navbar />
        <WorkingSection />
      </div>
    </div>
  );
};
