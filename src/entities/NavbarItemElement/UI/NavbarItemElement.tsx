import React, { MouseEventHandler } from "react";
import cn from "classnames";
import cl from "./NavbarItemElement.module.sass";

export const NavbarItemElement = ({
  id,
  element,
  activeId,
  onClick,
}: {
  id: number;
  element: string;
  activeId: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={cn(cl.navbarItemElement, activeId === id ? cl.active : "")}
      onClick={onClick}
    >
      <div className={cl.itemElementIcon}></div>
      <div className={cl.itemElementText}>
        <span>{element}</span>
      </div>
    </div>
  );
};
