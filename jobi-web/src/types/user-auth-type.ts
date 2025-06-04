// 用户信息类型
export interface IUser {
    id: string; // 用户唯一标识符
    username: string; // 用户名
    email: string; // 邮箱
    avatarUrl?: string; // 头像 URL（可选）
    roles: string[]; // 用户角色，例如 ["admin", "user"]
    permissions?: string[]; // 用户权限，例如 ["read", "write", "delete"]
    isActive: boolean; // 是否激活
    lastLogin?: string; // 上次登录时间（ISO 日期格式）
    provider?: AuthProvider; // 登录方式（Google, Facebook 或 Email）
  }
  
  // 登录方式类型
  export type AuthProvider = "email" | "google" | "facebook";
  
  // 登录凭证类型
  export interface IAuthCredentials {
    email: string; // 用户名或邮箱
    password: string; // 密码
    rememberMe?: boolean; // 是否保持登录状态（可选）
  }
  
  // 社交登录凭证类型
  export interface ISocialAuthCredentials {
    provider: AuthProvider; // 登录方式
    accessToken: string; // 第三方授权返回的令牌
  }
  
  // 登录响应类型
  export interface IAuthResponse {
    accessToken: string; // 访问令牌（JWT 或其他形式）
    refreshToken?: string; // 刷新令牌（可选）
    user: IUser; // 用户信息
  }
  
  // 注册类型
  export interface IRegisterCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  // 权限类型
  export type Permission =
    | "read"
    | "write"
    | "delete"
    | "update"
    | "candidate"
    | "employer"
    | "admin";
  
  // 角色类型
  export type Role = "user" | "admin" | "moderator" | "guest";
  
  // 用户状态类型
  export type UserStatus = "authenticated" | "unauthenticated" | "pending";
  
  // 错误类型
  export interface IAuthError {
    code: string; // 错误代码，例如 "INVALID_CREDENTIALS"
    message: string; // 错误信息
  }
  
  // 前端存储的认证状态类型
  export interface IAuthState {
    user: IUser | null; // 当前登录用户信息
    token: string | null; // 访问令牌
    isAuthenticated: boolean; // 是否已认证
    loading: boolean; // 是否正在进行认证请求
    error?: IAuthError; // 认证错误信息（如果有）
    rememberMe?: boolean;
  }
  
  // 前端动作类型
  export type AuthAction =
    | { type: "LOGIN_REQUEST" }
    | { type: "LOGIN_SUCCESS"; payload: IAuthResponse }
    | { type: "LOGIN_FAILURE"; payload: IAuthError }
    | { type: "LOGOUT" }
    | { type: "REFRESH_TOKEN"; payload: { accessToken: string } };
  
  // 用户刷新令牌类型
  export interface IRefreshTokenRequest {
    refreshToken: string; // 刷新令牌
  }
  
  // 社交登录选项类型
  export interface ISocialLoginOptions {
    provider: AuthProvider; // 登录方式
    redirectUri: string; // 第三方登录后的回调地址
  }
  
  