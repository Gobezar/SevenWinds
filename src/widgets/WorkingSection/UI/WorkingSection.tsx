import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { getData } from "../model/workingSectionSlice";
import { SelectedSection } from "../../../entities/SelectedSection";
import cl from "./WorkingSection.module.sass";
import { HeadersContentSection } from "../../../entities/HeadersContentSection";
import { ContentRow } from "../../../entities/ContentRow";
import { NewContentForm } from "../../../entities/NewContentForm";
import { setCreatingNewRow } from "../model/workingSectionSlice";

export const WorkingSection = () => {
  const dispatch = useAppDispatch();
  const { data, initialData, creatingNewRow } = useAppSelector(
    (state) => state.workingSectionSlice
  );

  useEffect(() => {
    dispatch(getData());
    dispatch(setCreatingNewRow(false));
  }, [initialData.current, dispatch]);

  return (
    <div className={cl.workingSectionWrapper}>
      <SelectedSection />
      <div className={cl.contentSection}>
        <HeadersContentSection />
        {data.length > 0 ? (
          data.map((el) => (
            <ContentRow
              key={el.id}
              el={el}
              child={el.child}
              rID={el.id}
              parentId={el.id}
              rowName={el.rowName}
              salary={el.salary}
              equipmentCosts={el.equipmentCosts}
              overheads={el.overheads}
              estimatedProfit={el.estimatedProfit}
              level={0}
            />
          ))
        ) : (
          <NewContentForm />
        )}
        {creatingNewRow && <NewContentForm />}
      </div>
    </div>
  );
};
