import axios from "axios";
import { store } from "@/redux/store";
import { refreshToken } from "@/redux/features/authThunk";
import { logout } from "@/redux/features/authSlice";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器
instance.interceptors.request.use(
  async (config) => {
    const { token } = store.getState().auth;

    if (token) {
      // 解析 JWT 获取过期时间
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = tokenData.exp - currentTime;

      // 检查令牌剩余时间
      if (timeLeft < 24 * 3600 && timeLeft > 0) {
        // 如果即将过期，发起刷新请求
        try {
          const response = await store.dispatch(refreshToken()).unwrap();
          // 更新请求头中的令牌
          config.headers.Authorization = `Bearer ${response.accessToken}`;
        } catch (error) {
          // 如果刷新失败，登出用户
          store.dispatch(logout());
          throw new Error("Token expired and refresh failed. Logging out user.");
        }
      } else if (timeLeft <= 0) {
        // 如果令牌已过期，直接登出
        store.dispatch(logout());
        throw new Error("Token expired. Logging out user.");
      } else {
        // 令牌仍然有效
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // 如果后端返回 401 未授权，处理登出逻辑
//       store.dispatch(logout());
//       throw new Error("Unauthorized. Logging out user.");
//     }
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      if (originalRequest.url.includes("/auth/login")) {
        return Promise.reject(error);
      }

      try {
        const newToken = await store.dispatch(refreshToken()).unwrap();
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        throw new Error("Unauthorized. Logging out user.");
      }
    }
    
    return Promise.reject(error);
  }
);


export default instance;
