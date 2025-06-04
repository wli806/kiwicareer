import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { notifySuccess, notifyError } from "@/utils/toast";

export interface AccountSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AccountState {
  settings: AccountSettings;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: AccountState = {
  settings: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  loading: false,
  error: null,
};

// 获取用户账户信息
export const getAccountSettings = createAsyncThunk(
  "account/getAccountSettings",
  async ({ forceFetch = false }: { forceFetch?: boolean } = {}, { rejectWithValue, getState }) => {

    const state = getState() as { account: AccountState };

    if (
      !forceFetch && 
      (
      state.account.settings.firstName ||
      state.account.settings.lastName ||
      state.account.settings.email ||
      state.account.settings.phone
      )
    ) {
      return state.account.settings;
    }

    try {
      const response = await axios.get<AccountSettings>(
        `${process.env.API_BASE_URL}/user/get-account-settings`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch account settings");
    }
  }
);

// 更新用户账户信息
export const updateAccountSettings = createAsyncThunk(
  "account/updateAccountSettings",
  async (settings: AccountSettings, { dispatch, rejectWithValue }) => {
    try {
      // 🔹 校验 Email 和 Phone
      if (!/^\S+@\S+\.\S+$/.test(settings.email)) {
        return rejectWithValue("Invalid email format");
      }

      if (!/^\+?[0-9]{8,15}$/.test(settings.phone.replace(/\s/g, ""))) {
        return rejectWithValue("Invalid phone number format");
      }    

      const response = await axios.post(`${process.env.API_BASE_URL}/user/update-account-settings`, settings);

      notifySuccess("Account settings updated successfully!");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update account settings");
    }
  }
);

// 创建 Slice
const accountSettingsSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateField: (state, { payload }: { payload: { field: keyof AccountSettings; value: string } }) => {
      state.settings[payload.field] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountSettings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.settings = payload;
      })
      .addCase(getAccountSettings.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(updateAccountSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountSettings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.settings = payload;
      })
      .addCase(updateAccountSettings.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        notifyError(payload as string);
      });
  },
});

export const { updateField } = accountSettingsSlice.actions;
export default accountSettingsSlice.reducer;
