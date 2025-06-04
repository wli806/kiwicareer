import { IJobType } from "@/types/job-data-type";
import { IUser, IAuthResponse, IAuthState } from "@/types/user-auth-type";

// 通用存储方法
export const setLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  }
  return defaultValue;
};

export const clearLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// 用户信息存储方法
export const setUser = (user: IUser): void => {
  setLocalStorage<IUser>("user", user);
};

export const getUser = (): IUser | null => {
  const defaultUser: IUser | null = null;
  return getLocalStorage<IUser | null>("user", defaultUser);
};

export const clearUser = (): void => {
  clearLocalStorage("user");
};

// 认证状态存储方法
export const setAuthState = (authState: IAuthState): void => {
  setLocalStorage<IAuthState>("authState", authState);
};

export const getAuthState = (): IAuthState | null => {
  const defaultAuthState: IAuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: undefined,
  };
  return getLocalStorage<IAuthState>("authState", defaultAuthState);
};

export const clearAuthState = (): void => {
  clearLocalStorage("authState");
};

// 登录响应存储方法
export const setAuthResponse = (authResponse: IAuthResponse): void => {
  setLocalStorage<IAuthResponse>("authResponse", authResponse);
};

export const getAuthResponse = (): IAuthResponse | null => {
  const defaultAuthResponse: IAuthResponse | null = null;
  return getLocalStorage<IAuthResponse | null>("authResponse", defaultAuthResponse);
};

export const clearAuthResponse = (): void => {
  clearLocalStorage("authResponse");
};

// 工作类型存储方法
export const setJobTypes = (jobTypes: IJobType[]): void => {
  setLocalStorage<IJobType[]>("jobTypes", jobTypes);
};

export const getJobTypes = (): IJobType[] => {
  return getLocalStorage<IJobType[]>("jobTypes", []);
};

export const clearJobTypes = (): void => {
  clearLocalStorage("jobTypes");
};