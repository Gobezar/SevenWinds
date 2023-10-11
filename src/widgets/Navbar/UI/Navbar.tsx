import React from "react";
import { navbarElements } from "../consts/navbarElements";
import { useAppSelector, useAppDispatch } from "../../../app/store/reduxHooks";
import { setActive } from "../../WorkingSection/model/workingSectionSlice";
import cl from "./Navbar.module.sass";
import { NavbarItemElement } from "../../../entities/NavbarItemElement";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { activeNavbarElement } = useAppSelector(
    (state) => state.workingSectionSlice
  );

  function setActiveNavbarElement(id: number): void {
    dispatch(setActive(id));
  }

  return (
    <div className={cl.navbarWrapper}>
      <div className={cl.choiseMethodWrapper}>
        <div className={cl.namingMethods}>
          <span>Название проекта</span>
          <span>Аббревиатура</span>
        </div>
        <div className={cl.iconChoise}></div>
      </div>
      <div>
        {navbarElements.map((el) => (
          <NavbarItemElement
            key={el.id}
            id={el.id}
            element={el.element}
            onClick={() => setActiveNavbarElement(el.id)}
            activeId={activeNavbarElement}
          />
        ))}
      </div>
    </div>
  );
};
