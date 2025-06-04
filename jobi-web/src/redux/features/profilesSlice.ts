// src/redux/features/profileSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { notifySuccess, notifyError } from "@/utils/toast";
import { update_user_profile } from "@/redux/features/authSlice";

export interface UserProfile {
  avatar_url: string;
  fullName: string;
  bio: string;
  socialLinks: string[];
  isRecommandRequired: boolean;
  wishedJobCategories: string[];
  wishedJobLocations: string[];
  wishedJobTypes: string[];
}

export interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// 初始化状态
const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const uploadAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async (file: File, { rejectWithValue }) => {
    try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axios.post(`${process.env.API_BASE_URL}/oss/upload-avatar`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });

    if (response.data.url) {
        return response.data.url; // 返回 OSS 上传后的头像 URL
    } else {
        return rejectWithValue("Failed to upload avatar.");
    }
    } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Avatar upload failed.");
    }
  }
);

// 获取用户数据 Thunk
export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async ({ forceFetch = false }: { forceFetch?: boolean } = {}, { getState, rejectWithValue }) => {
    const { profile } = getState() as { profile: ProfileState };
    if (!forceFetch && profile.profile) {
      return profile.profile; // 直接返回现有数据，不发起请求
    }

    try {
      const response = await axios.get<UserProfile>(`${process.env.API_BASE_URL}/user/get-user-profile`);
    return response.data;
    } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// 上传用户数据的 Thunk
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ profileData, selectedFile }: { profileData: UserProfile; selectedFile: File | null }, { dispatch, rejectWithValue }) => {
    try {
    let avatarUrl = profileData.avatar_url;

    // 🔸 如果用户选择了新的头像，则先上传头像
    if (selectedFile) {
        const uploadedAvatarUrl = await dispatch(uploadAvatar(selectedFile)).unwrap();
        avatarUrl = uploadedAvatarUrl;
    }

    // 🔸 更新用户信息
    const updatedProfile = { ...profileData, avatar_url: avatarUrl };
    const response = await axios.post(`${process.env.API_BASE_URL}/user/update-user-profile`, updatedProfile);

    dispatch(update_user_profile({ 
      avatar_url: updatedProfile.avatar_url,
      fullName: updatedProfile.fullName,
    }));

    return updatedProfile;
    } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update profile.");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
    })
    .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
    })
    .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
      if (state.profile) {
        state.profile.avatar_url = payload; // 立即更新 Redux 里的头像 URL
      }
    })
    .addCase(uploadAvatar.rejected, (state, { payload }) => {
        notifyError(`Failed to upload avatar: ${payload}`);
    })
    .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
        notifySuccess("Profile updated successfully!");
    })
    .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        notifyError(`Failed to update profile: ${payload}`);
    });
  },
});

export default profileSlice.reducer;
