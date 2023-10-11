import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import {
  postData,
  setCreatingNewRow,
} from "../../../widgets/WorkingSection/model/workingSectionSlice";
import cl from "./NewContentForm.module.sass";

export const NewContentForm = () => {
  const { currentId } = useAppSelector((state) => state.workingSectionSlice);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rowName: "",
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,

    id: 0,
    total: 0,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    parentId: currentId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = isNaN(parseInt(value, 10))
      ? value
      : parseInt(value, 10);
    setFormData({
      ...formData,
      [name]: name === "text" ? value : numericValue,
    });
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(formData);
      dispatch(postData(formData));
      dispatch(setCreatingNewRow(false));
    }
  };
  return (
    <div className={cl.newContentFormWrapper}>
      <div className={cl.iconWrapper}>
        <div className={cl.iconRow}></div>
      </div>
      <div className={cl.rowsWrapper}>
        <div className={cl.rowName}>
          <label>
            <input
              type="text"
              name="rowName"
              value={formData.rowName}
              onChange={handleInputChange}
              onKeyPress={handleEnterPress}
            />
          </label>
        </div>
        <div className={cl.salary}>
          <label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              onKeyPress={handleEnterPress}
            />
          </label>
        </div>
        <div className={cl.equipmentCosts}>
          <label>
            <input
              type="number"
              name="equipmentCosts"
              value={formData.equipmentCosts}
              onChange={handleInputChange}
              onKeyPress={handleEnterPress}
            />
          </label>
        </div>
        <div className={cl.overheads}>
          <label>
            <input
              type="number"
              name="overheads"
              value={formData.overheads}
              onChange={handleInputChange}
              onKeyPress={handleEnterPress}
            />
          </label>
        </div>
        <div className={cl.estimatedProfit}>
          <label>
            <input
              type="number"
              name="estimatedProfit"
              value={formData.estimatedProfit}
              onChange={handleInputChange}
              onKeyPress={handleEnterPress}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
