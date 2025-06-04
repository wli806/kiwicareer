import { IUser, IAuthResponse, IAuthState } from "@/types/user-auth-type";

// 通用存储方法
export const setSessionStorage = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const getSessionStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  }
  return defaultValue;
};

export const clearSessionStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

// 用户信息存储方法
export const setUser = (user: IUser): void => {
    setSessionStorage<IUser>("user", user);
};

export const getUser = (): IUser | null => {
  const defaultUser: IUser | null = null;
  return getSessionStorage<IUser | null>("user", defaultUser);
};

export const clearUser = (): void => {
  clearSessionStorage("user");
};

// 认证状态存储方法
export const setAuthState = (authState: IAuthState): void => {
  setSessionStorage<IAuthState>("authState", authState);
};

export const getAuthState = (): IAuthState | null => {
  const defaultAuthState: IAuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: undefined,
  };
  return getSessionStorage<IAuthState>("authState", defaultAuthState);
};

export const clearAuthState = (): void => {
  clearSessionStorage("authState");
};

// 登录响应存储方法
export const setAuthResponse = (authResponse: IAuthResponse): void => {
  setSessionStorage<IAuthResponse>("authResponse", authResponse);
};

export const getAuthResponse = (): IAuthResponse | null => {
  const defaultAuthResponse: IAuthResponse | null = null;
  return getSessionStorage<IAuthResponse | null>("authResponse", defaultAuthResponse);
};

export const clearAuthResponse = (): void => {
  clearSessionStorage("authResponse");
};

// 工作类型存储方法
// export const setJobTypes = (jobTypes: IJobType[]): void => {
//   setSessionStorage<IJobType[]>("jobTypes", jobTypes);
// };

// export const getJobTypes = (): IJobType[] => {
//   return getSessionStorage<IJobType[]>("jobTypes", []);
// };

// export const clearJobTypes = (): void => {
//   clearSessionStorage("jobTypes");
// };