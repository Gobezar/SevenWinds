import React, { useState } from "react";
import HeaderMenuElement from "../../../entities/HeaderMenuElement/UI/HeaderMenuElement";
import { menuElements } from "../../../entities/HeaderMenuElement/consts/headerMenuElements";
import cl from "./Header.module.sass";

const Header = () => {
  const [activeId, setActiveId] = useState(0);

  function setActiveMenuElement(id: number): void {
    setActiveId(id);
  }

  return (
    <div className={cl.headerWrapper}>
      <div className={cl.iconCubes}></div>
      <div className={cl.iconArrow}></div>
      {menuElements.map((el) => (
        <HeaderMenuElement
          key={el.id}
          id={el.id}
          element={el.element}
          onClick={() => setActiveMenuElement(el.id)}
          activeId={activeId}
        />
      ))}
    </div>
  );
};

export default Header;
