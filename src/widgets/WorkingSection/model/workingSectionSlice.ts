import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { eID, api } from "../../../app/consts/eID";
// import { IMOrtgage } from "../../types/IMortgage";

// const eID = 113165;
export const getData = createAsyncThunk("fetch/getData", async () => {
  const response = await axios.get(
    `${api}/v1/outlay-rows/entity/${eID}/row/list`
  );
  const result = response.data;
  return result;
});
export const postData = createAsyncThunk(
  "fetch/postData",
  async (data: any) => {
    const response = await axios.post(
      `${api}/v1/outlay-rows/entity/${eID}/row/create`,
      data
    );
    const result = response.data;
    return result;
  }
);
export const updateData = createAsyncThunk(
  "fetch/updateData",
  async ({ localData, rID }: { localData: any; rID: number }) => {
    const response = await axios.post(
      `${api}/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
      localData
    );
    const result = response.data;
    console.log("сработала");
    return result;
  }
);

export const deleteData = createAsyncThunk(
  "fetch/deleteData",
  async (rID: number) => {
    const response = await axios.delete(
      `${api}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`
    );
    const result = response.data;
    return result;
  }
);

export interface IRow {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: IRow[] | [];
  parentId?: number;
  //   current?: any;
  //   changed?: IRow[];
}

interface IWorkingSectionProps {
  activeNavbarElement: number;
  isLoading: boolean;
  error: string;
  data: IRow[];
  initialData: {
    current: any;
    changed: any;
  };
  creatingNewRow: boolean;
  currentId: null | number;
}

const initialState: IWorkingSectionProps = {
  activeNavbarElement: 0,
  isLoading: false,
  error: "",
  data: [],
  initialData: {
    current: null,
    changed: [],
  },
  creatingNewRow: false,
  currentId: null,
};

const workingSectionSlice = createSlice({
  name: "workingSection",
  initialState,
  reducers: {
    setActive(state, action) {
      state.activeNavbarElement = action.payload;
    },
    setCreatingNewRow(state, action) {
      state.creatingNewRow = action.payload;
    },
    setCurrentId(state, action) {
      state.currentId = action.payload;
    },
  },

  extraReducers: {
    [getData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
    [getData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [postData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.initialData.current = action.payload.current;
    },
    [postData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.initialData.current = state.data[state.data.length - 1];
    },
    [deleteData.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [deleteData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
    [updateData.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [updateData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setActive, setCreatingNewRow, setCurrentId } =
  workingSectionSlice.actions;
export default workingSectionSlice.reducer;
