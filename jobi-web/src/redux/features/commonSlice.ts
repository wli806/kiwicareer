import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage, clearLocalStorage } from "@/utils/localstorage";

interface CommonState {
  // isChinese 为 true 表示中文，为 false 表示英文（默认英文）
  isChinese: boolean;
}

// 从 localStorage 获取初始状态，若不存在则默认英文（false）
const initialState: CommonState = getLocalStorage<CommonState>("languageState", {
  isChinese: false,
});

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    // 直接设置语言，并存入 localStorage
    setLanguage: (state, action: PayloadAction<boolean>) => {
      state.isChinese = action.payload;
      setLocalStorage("languageState", state);
    },
    // 切换语言状态，并存入 localStorage
    toggleLanguage: (state) => {
      state.isChinese = !state.isChinese;
      setLocalStorage("languageState", state);
    },
    // 重置语言状态，并清除 localStorage 中的记录
    resetLanguage: (state) => {
      state.isChinese = false;
      clearLocalStorage("languageState");
    },
  },
});

export const { setLanguage, toggleLanguage, resetLanguage } = commonSlice.actions;
export default commonSlice.reducer;
