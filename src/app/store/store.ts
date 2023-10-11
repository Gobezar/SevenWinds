import { combineReducers, configureStore } from "@reduxjs/toolkit";
import workingSectionSlice from "../../widgets/WorkingSection/model/workingSectionSlice";

const rootReducer = combineReducers({
  workingSectionSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
