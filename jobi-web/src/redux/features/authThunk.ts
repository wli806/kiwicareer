import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios"; // 使用配置了拦截器的 axios 实例
import { 
  start_loading,
  end_loading,
  refresh_token_success, 
  refresh_token_failure, 
  register_success,
  register_failure,
  login_success, 
  login_failure, 
  logout,
  logout_failure 
} from "./authSlice";
import { IAuthResponse, IAuthCredentials, IAuthError } from "@/types/user-auth-type";
import { getLocalStorage } from "@/utils/localstorage";
import { getSessionStorage } from "@/utils/sessionstorage";
import { RootState } from "../store";
import { notifySuccess, notifyError } from "@/utils/toast";

export type IRegisterFormData = {
  username: string;
  email: string;
  password: string;
  // role: string
};

export type ILoginFormData = {
  email: string;
  password: string;
  remember_me: boolean
};

interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

// 定义 refreshToken 的 thunk
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { rememberMe } = state.auth;

      // 获取 refreshToken
      const refreshToken = rememberMe
        ? getLocalStorage("refreshToken", null)
        : getSessionStorage("refreshToken", null);

      if (!refreshToken) {
        throw new Error("No refresh token available.");
      }

      // 发送刷新令牌请求
      const response = await axios.post<IAuthResponse>(`${process.env.API_BASE_URL}/auth/refresh`, { refreshToken });

      // 假设返回的新令牌是 IAuthResponse 格式
      const data = response.data;

      // 成功后 dispatch 对应的成功 action
      dispatch(refresh_token_success(data));

      return data; // 返回给调用方（通常是拦截器）
    } catch (error: any) {
      // 如果刷新失败，dispatch 对应的失败 action
      dispatch(refresh_token_failure({ code: "REFRESH_FAILED", message: error.message }));

      // 如果需要，可以立即触发登出
      dispatch(logout());

      return rejectWithValue(error.message); // 返回错误信息
    }
  }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
      { email, password, rememberMe }: IAuthCredentials & { rememberMe: boolean },
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(start_loading());
        const response = await axios.post<IAuthResponse>(`${process.env.API_BASE_URL}/auth/login`, {
          email,
          password,
          rememberMe
        });
        
        const data: IAuthResponse & { rememberMe: boolean } = {
          ...response.data,
          rememberMe,
        };
        dispatch(login_success(data));
        return data;
      } catch (error: any) {
        dispatch(login_failure({ code: "LOGIN_FAILED", message: error.response?.data?.message }));
        console.log(error.message)
        return rejectWithValue(error.response?.data || error.message);
      }
      finally {
        dispatch(end_loading()); 
      }
    }
  );
  

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: IRegisterFormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(start_loading());
      const response = await axios.post(`${process.env.API_BASE_URL}/auth/register`, data);
      dispatch(register_success(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(register_failure({ code: "REGISTER_FAILED", message: error.response?.data?.message }));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(end_loading());
    }
  }
);
  
  
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue  }) => {
    try {
      dispatch(start_loading());
      
      // 清除后端的 refresh token (如果需要)
      await axios.post(`${process.env.API_BASE_URL}/auth/logout`, {});

      // 调用 Redux 的 logout action 清除前端的用户状态
      dispatch(logout());

    } catch (error: any) {
      // 处理可能的错误日志（可选）
      dispatch(logout_failure({ code: "LOGOUT_FAILED", message: error.response?.data?.message }));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(end_loading());
    }
  }
);
  

// 🔹 更新密码请求
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload: UpdatePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/auth/change-password`, payload);
      notifySuccess("Password updated successfully!");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);