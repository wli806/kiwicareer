import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "@/utils/localstorage";
import { setSessionStorage, clearSessionStorage } from "@/utils/sessionstorage";
import {
  IAuthState,
  IAuthResponse,
  IAuthError,
} from "@/types/user-auth-type";
import { notifyError, notifySuccess } from "@/utils/toast";

const authData = getLocalStorage<IAuthState>("authState", {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: undefined,
  rememberMe: false,
});

let initialAuthState: IAuthState = authData;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {

    initialize_auth: (state) => {
      state.loading = false;
    },

    // 普通登录成功
    login_success: (
        state,
        { payload }: { payload: IAuthResponse & { rememberMe?: boolean } }
      ) => {
      state.user = payload.user;
      state.token = payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = undefined;
      state.rememberMe = !!payload.rememberMe;

      notifySuccess("Login successful!");

      if (payload.refreshToken) {
        if (payload.rememberMe) {
          setLocalStorage("refreshToken", payload.refreshToken);
        } else {
          setSessionStorage("refreshToken", payload.refreshToken);
        }
      }

      // 同步到 localStorage
      setLocalStorage("authState", state);
    },

    // 普通登录失败
    login_failure: (state, { payload }: { payload: IAuthError }) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;
      
      const errorMessage = payload.message || "Login failed. Please try again.";
      notifyError(`Login failed: ${errorMessage}`);
    },

    update_user_profile: (
      state,
      { payload }: { payload: { avatar_url: string; fullName: string } }
    ) => {
      if (state.user) {
        state.user.avatarUrl = payload.avatar_url;
        state.user.username = payload.fullName;

        setLocalStorage("authState", state);
      }
    },

    // 登出
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = undefined;

      notifySuccess("Logout successful!");

      // 清理 localStorage
      clearLocalStorage("authState");
    },

    logout_failure: (state, { payload }: { payload: IAuthError }) => {
      state.error = payload;
      state.loading = false;
    
      notifyError(`Logout failed. Please try again later.`);
    },    

    // 开始加载
    start_loading: (state) => {
      state.loading = true;
    },

    // 结束加载
    end_loading: (state) => {
      state.loading = false;
    },

    // 社交登录成功 (Google / Facebook)
    social_login_success: (state, { payload }: { payload: IAuthResponse }) => {
      state.user = payload.user;
      state.token = payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = undefined;

      notifySuccess("Social login successful!");

      setLocalStorage("authState", state);
    },

    // 社交登录失败
    social_login_failure: (state, { payload }: { payload: IAuthError }) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;

      notifyError(`Social login failed: ${payload.message}`);
    },

    // 注册成功 (自动登录场景)
    register_success: (state, { payload }: { payload: IAuthResponse }) => {
      state.loading = false;
      state.error = undefined;
   
      notifySuccess(`Registration successful! Please login to continue.`);
   },

    // 注册失败
    register_failure: (state, { payload }: { payload: IAuthError }) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;

      console.log(payload)
      const errorMessage = payload.message || "Registration failed.";
      notifyError(`Registration failed: ${errorMessage}`);
    },

    // 刷新令牌成功
    // 后端返回新的 accessToken 和可选 user
    refresh_token_success: (state, { payload }: { payload: IAuthResponse }) => {
      state.token = payload.accessToken;
      // 如果后端返回 updated user 信息
      state.user = payload.user || state.user;
      state.error = undefined;

      notifySuccess("Token refreshed successfully!");

      if (payload.refreshToken) {
        if (state.rememberMe) {
          setLocalStorage("refreshToken", payload.refreshToken);
        } else {
          setSessionStorage("refreshToken", payload.refreshToken);
        }
      }

      setLocalStorage("authState", state);
    },

    // 刷新令牌失败
    refresh_token_failure: (state, { payload }: { payload: IAuthError }) => {
      state.error = payload;
      state.isAuthenticated = false;

      notifyError(`Token refresh failed: ${payload.message}`);

      // 触发 logout
      state.user = null;
      state.token = null;
      state.loading = false;
      clearLocalStorage("authState");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("refreshToken");
    },

  },
});

/**
 * 3) 导出 Actions 与 Reducer
 */
export const {
  // 登录
  login_success,
  login_failure,

  // 登出
  logout,
  logout_failure,

  // 加载
  start_loading,
  end_loading,

  // 社交登录
  social_login_success,
  social_login_failure,

  // 注册
  register_success,
  register_failure,

  // 刷新令牌
  refresh_token_success,
  refresh_token_failure,

  update_user_profile,
  initialize_auth

} = authSlice.actions;

export default authSlice.reducer;
