import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IFilterState {
  location: string;
  search_key: string;
  job_type: string[];
  english_fluency: string;
  experience: string[];
  category: string[];
  tags: string[];
  locations: string[];
  categories: string[];
  jobTypes: string[];
  salaryRange: number[];
  grid_type: boolean;
}

// Define the initial state using that type
const initialState: IFilterState = {
  location: "",
  search_key: "",
  job_type: [],
  english_fluency: "",
  experience: [],
  category: [],
  tags: [],
  locations: [],
  categories: [],
  jobTypes: ["Full-Time", "Part-Time", "Contract", "Internship", "Temporary", "Freelance"],
  salaryRange: [0, 120],
  grid_type: true
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload || "";
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.search_key = action.payload || "";
    },
    setJobType: (state, action: PayloadAction<string | string[]>) => {
      if (typeof action.payload === "string") {
        if (state.job_type.includes(action.payload)) {
          state.job_type = state.job_type.filter((e) => e !== action.payload);
        } else {
          state.job_type.push(action.payload);
        }
      } else {
        state.job_type = action.payload; 
      }
    },
    setEnglishFluency: (state, action: PayloadAction<string>) => {
        state.english_fluency = action.payload || "";
    },
    setExperience: (state, action: PayloadAction<string | string[]>) => {
      if (typeof action.payload === "string") {
        if (state.experience.includes(action.payload)) {
          state.experience = state.experience.filter((e) => e !== action.payload);
        } else {
          state.experience.push(action.payload);
        }
      } else {
        state.experience = action.payload;
      }
    },
    setCategory: (state, action: PayloadAction<string | string[]>) => {
      if (typeof action.payload === "string") {
        if (state.category.includes(action.payload)) {
          state.category = state.category.filter((c) => c !== action.payload);
        } else {
          state.category.push(action.payload);
        }
      } else {
        state.category = action.payload;
      }
    },
    setLocations: (state, action: PayloadAction<string[]>) => {
      state.locations = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setSalaryRange: (state, action: PayloadAction<number[]>) => {
      state.salaryRange = action.payload;
    },
    setGridType: (state, action: PayloadAction<boolean>) => {
      state.grid_type = action.payload;
    },
    resetFilter: (state) => {
      state.location = "";
      state.search_key = "";
      state.job_type = [];
      state.english_fluency = "";
      state.experience = [];
      state.category = [];
      state.tags = [];
      state.salaryRange = [0, 120];
    },
  },
});

export const {
  setLocation,
  setSearchKey,
  setJobType,
  setEnglishFluency,
  setExperience,
  setCategory,
  setLocations,
  setCategories,
  setSalaryRange,
  setGridType,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
