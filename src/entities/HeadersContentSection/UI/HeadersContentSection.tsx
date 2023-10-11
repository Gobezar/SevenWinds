import React from "react";
import cl from "./HeadersContentSection.module.sass";

export const HeadersContentSection = () => {
  return (
    <div className={cl.headersWrapper}>
      <div className={cl.level}>
        <span>Уровень</span>
      </div>
      <div className={cl.rowName}>
        <span>Наименование работ</span>
      </div>

      <div className={cl.salary}>
        <span>Основная з/п</span>
      </div>
      <div className={cl.equipmentCosts}>
        <span>Оборудование</span>
      </div>

      <div className={cl.overheads}>
        <span>Накладные расходы</span>
      </div>

      <div className={cl.estimatedProfit}>
        <span>Сметная прибыль</span>
      </div>
    </div>
  );
};
