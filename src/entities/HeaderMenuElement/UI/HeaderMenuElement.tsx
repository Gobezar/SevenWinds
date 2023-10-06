import React, { MouseEventHandler } from "react";
import cn from "classnames";
import cl from "./HeaderMenuElement.module.sass";

const HeaderMenuElement = ({
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
      className={cn(cl.menuElement, activeId === id ? cl.active : "")}
      onClick={onClick}
    >
      <span>{element}</span>
    </div>
  );
};

export default HeaderMenuElement;
