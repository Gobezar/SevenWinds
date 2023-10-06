import React, { useState } from "react";
import { navbarElements } from "../consts/navbarElements";
import cl from "./Navbar.module.sass";
import NavbarItemElement from "../../../entities/NavbarItemElement/UI/NavbarItemElement";

const Navbar = () => {
  const [activeId, setActiveId] = useState(0);

  function setActiveNavbarElement(id: number): void {
    setActiveId(id);
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
            activeId={activeId}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
