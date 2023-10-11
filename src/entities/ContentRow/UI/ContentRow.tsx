import React, { useState } from "react";
import cl from "./ContentRow.module.sass";
import { useAppDispatch } from "../../../app/store/reduxHooks";
import {
  deleteData,
  setCreatingNewRow,
  getData,
  setCurrentId,
  updateData,
} from "../../../widgets/WorkingSection/model/workingSectionSlice";
import { countTotalChildren } from "../lib/countTotalChildren";
import { IRow } from "../../../widgets/WorkingSection/model/workingSectionSlice";
import cn from "classnames";

interface IContentRow {
  el: IRow;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  rID: number;
  parentId: number;
  child: IRow[] | [];
  level: number;
  isLastElement?: boolean;
}

export const ContentRow: React.FC<IContentRow> = ({
  el,
  rowName,
  salary,
  equipmentCosts,
  overheads,
  estimatedProfit,
  rID,
  parentId,
  child,
  level,
  isLastElement,
}) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [localRowName, setLocalRowName] = useState(rowName);
  const [localSalary, setLocalSalary] = useState(salary);
  const [localEquipmentCosts, setLocalEquipmentCosts] =
    useState(equipmentCosts);
  const [localOverheads, setLocalOverheads] = useState(overheads);
  const [localEstimatedProfit, setLocalEstimatedProfit] =
    useState(estimatedProfit);

  const updatedRow = {
    equipmentCosts: localEquipmentCosts,
    estimatedProfit: localEstimatedProfit,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: localOverheads,
    rowName: localRowName,
    salary: localSalary,
    supportCosts: 0,
  };

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleDoubleClick() {
    setIsEditing(true);
  }
  function handleBlur() {
    setIsEditing(false);
  }

  function deleteRow(id: number) {
    dispatch(deleteData(id));
    dispatch(setCurrentId(null));

    setTimeout(() => {
      dispatch(getData());
    }, 0);
  }

  function creatingNewRow() {
    if (level <= 1) {
      dispatch(setCreatingNewRow(true));
      dispatch(setCurrentId(parentId));
    } else if (level > 1) {
      alert("Нельзя создать большую вложенность");
    }
  }

  async function handleUpdateData(event: any) {
    event.preventDefault();
    await dispatch(updateData({ localData: updatedRow, rID }));
    dispatch(getData());
  }

  const totalChildrenCount = countTotalChildren(el);

  return (
    <>
      <form
        onSubmit={(event) => handleUpdateData(event)}
        action=""
        method="POST"
      >
        <div className={cl.contentRowWrapper} onDoubleClick={handleDoubleClick}>
          <div
            className={cn(
              cl.iconWrapper,
              isHovered && cl.iconWrapperHovered,
              level === 1 && cl.childLevel1,
              level === 2 && cl.childLevel2
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              id="iconRow"
              className={cn(cl.iconRow, isHovered && cl.iconRowHovered)}
              onClick={() => creatingNewRow()}
            >
              {el.child.length > 0 && (
                <div
                  style={{
                    width: "1px",
                    height:
                      level === 0
                        ? `${60 * totalChildrenCount - 6}px`
                        : `${60 * totalChildrenCount - 6}px`,
                    background: "#C6C6C6",
                    position: "absolute",
                    bottom:
                      level === 0
                        ? `-${60 * totalChildrenCount - 11}px`
                        : `-${60 * totalChildrenCount - 11}px`,
                    left: "11px",
                  }}
                ></div>
              )}
              {level >= 1 && (
                <div
                  style={{
                    width: `${14}px`,
                    height: "1px",
                    background: "#C6C6C6",
                    position: "absolute",
                    bottom: `11px`,
                    left: "-9px",
                  }}
                ></div>
              )}
            </div>

            <div
              onClick={() => deleteRow(rID)}
              className={cn(cl.iconDelete, isHovered && cl.iconDeleteHovered)}
            ></div>
          </div>

          <div className={cl.rowName}>
            <label>
              <input
                type="text"
                value={
                  rowName.length > 1 ? localRowName : "Наименование отсутствует"
                }
                readOnly={!isEditing}
                onBlur={handleBlur}
                onChange={(e) => setLocalRowName(e.target.value)}
              />
            </label>
          </div>
          <div className={cl.salary}>
            <label>
              <input
                type="number"
                value={localSalary}
                readOnly={!isEditing}
                onBlur={handleBlur}
                onChange={(e) => setLocalSalary(+e.target.value)}
              />
            </label>
          </div>
          <div className={cl.equipmentCosts}>
            <label>
              <input
                type="number"
                value={localEquipmentCosts}
                readOnly={!isEditing}
                onBlur={handleBlur}
                onChange={(e) => setLocalEquipmentCosts(+e.target.value)}
              />
            </label>
          </div>
          <div className={cl.overheads}>
            <label>
              <input
                type="number"
                value={localOverheads}
                readOnly={!isEditing}
                onBlur={handleBlur}
                onChange={(e) => setLocalOverheads(+e.target.value)}
              />
            </label>
          </div>
          <div className={cl.estimatedProfit}>
            <label>
              <input
                type="number"
                value={localEstimatedProfit}
                readOnly={!isEditing}
                onBlur={handleBlur}
                onChange={(e) => setLocalEstimatedProfit(+e.target.value)}
              />
            </label>
          </div>
        </div>
        <button
          style={{
            display: "none",
          }}
          type="submit"
        ></button>
      </form>
      {child.length > 0 &&
        child.map((el) => (
          <ContentRow
            el={el}
            key={el.id}
            rowName={el.rowName}
            salary={el.salary}
            equipmentCosts={el.equipmentCosts}
            overheads={el.overheads}
            estimatedProfit={el.estimatedProfit}
            rID={el.id}
            parentId={el.id}
            child={el.child}
            level={level + 1}
            isLastElement={el.id === child[child.length - 1].id}
          />
        ))}
    </>
  );
};
