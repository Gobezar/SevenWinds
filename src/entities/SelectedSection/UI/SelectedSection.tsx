import React from "react";
import { useAppSelector } from "../../../app/store/reduxHooks";
import { navbarElements } from "../../../widgets/Navbar/consts/navbarElements";
import cl from "./SelectedSection.module.sass";

export const SelectedSection = () => {
  const { activeNavbarElement } = useAppSelector(
    (state) => state.workingSectionSlice
  );

  return (
    <div className={cl.selectedSectionWrapper}>
      <div className={cl.selectedNavbarElement}>
        {navbarElements[activeNavbarElement].fullName}
      </div>
      <div className={cl.emptyBlock}></div>
    </div>
  );
};
