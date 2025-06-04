import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { notifySuccess, notifyError } from "@/utils/toast";

export interface Resume {
  id: number;
  resume_url: string;
  original_filename: string;
  uploaded_at: string;
}

export interface ResumeState {
  resumes: Resume[];
  loading: boolean;
  error: string | null;
  resumeDetails: ResumeDetails;
}

export interface Education {
  id: string;            // 前端本地生成的id
  title: string;
  academy: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface Experience {
  id: string;            // 前端本地生成的id
  title: string;
  company: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface ResumeDetails {
  introduction: string;
  educations: Education[];
  experiences: Experience[];
  skills: string[];
}

// 初始化状态
const initialState: ResumeState = {
  resumes: [],
  loading: false,
  error: null,
  resumeDetails: {
    introduction: "",
    educations: [],
    experiences: [],
    skills: [],
  },
};

// 获取用户简历
export const getUserResumes = createAsyncThunk(
  "resume/getUserResumes",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { resume: ResumeState };

    if (state.resume.resumes.length > 0) {
      return state.resume.resumes;
    }

    try {
      const response = await axios.get<Resume[]>(`${process.env.API_BASE_URL}/user/get-resumes`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch resumes");
    }
  }
);

// 上传简历
export const uploadUserResume = createAsyncThunk(
  "resume/uploadUserResume",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(`${process.env.API_BASE_URL}/oss/upload-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notifySuccess("Resume uploaded successfully!");
      return response.data;
    } catch (error: any) {
      notifyError(error.response?.data?.message || "Failed to upload resume");
      return rejectWithValue(error.response?.data?.message || "Failed to upload resume");
    }
  }
);

// 删除简历
export const deleteUserResume = createAsyncThunk(
  "resume/deleteUserResume",
  async (resumeUrl: string, { rejectWithValue }) => {
    try {
      await axios.post(`${process.env.API_BASE_URL}/oss/delete-resume`, { resume_url: resumeUrl });
      notifySuccess("Resume deleted successfully!");
      return resumeUrl;
    } catch (error: any) {
      notifyError("Failed to delete resume.");
      return rejectWithValue(error.response?.data?.message || "Failed to delete resume");
    }
  }
);

// 获取用户完整数据 (introduction, educations, experiences, skills)
export const getUserResumeDetails = createAsyncThunk(
  "resume/getUserResumeDetails",
  async ({ forceFetch = false }: { forceFetch?: boolean } = {}, { getState, rejectWithValue }) => {
    const { resume } = getState() as { resume: ResumeState };

    if (
        !forceFetch && resume.resumeDetails &&
    (
        resume.resumeDetails.introduction.trim() || 
        resume.resumeDetails.educations.length > 0 || 
        resume.resumeDetails.experiences.length > 0 || 
        resume.resumeDetails.skills.length > 0
    )
    ) {
      return resume.resumeDetails;
    }


    try {
      const response = await axios.get<ResumeDetails>(
        `${process.env.API_BASE_URL}/user/get-user-resume`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch resume details");
    }
  }
);

export const saveUserResumeDetails = createAsyncThunk(
  "resume/saveUserResumeDetails",
  async (_, { rejectWithValue, getState }) => {
    try {
      // 拿到 Redux 中的全部数据
      const state = getState() as { resume: ResumeState };
      const { resumeDetails } = state.resume;

      // 需要和后端确认提交格式，这里给个示例：
      const payload = {
        introduction: resumeDetails.introduction,
        educations: resumeDetails.educations,
        experiences: resumeDetails.experiences,
        skills: resumeDetails.skills,
      };

      const response = await axios.post(`${process.env.API_BASE_URL}/user/update-user-resume`, payload);

      notifySuccess("All resume details saved successfully!");
      return resumeDetails;
    } catch (error: any) {
      notifyError("Failed to save resume details.");
      return rejectWithValue(error.response?.data?.message || "Failed to save resume details");
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setIntroduction(state, action) {
      state.resumeDetails.introduction = action.payload;
    },

    addEducation(state) {
      state.resumeDetails.educations.push({
        id: Date.now().toString(), // 简单生成ID
        title: "",
        academy: "",
        startYear: "",
        endYear: "",
        description: "",
      });
    },
    updateEducation(state, action) {
      const { id, field, value } = action.payload; 
      const index = state.resumeDetails.educations.findIndex((edu) => edu.id === id);
      if (index !== -1) {
        (state.resumeDetails.educations as Education[])[index] = {
          ...state.resumeDetails.educations[index],
          [field]: value,
        };
      }
    },
    removeEducation(state, action) {
      state.resumeDetails.educations = state.resumeDetails.educations.filter((edu) => edu.id !== action.payload);
    },

    addExperience(state) {
      state.resumeDetails.experiences.push({
        id: Date.now().toString(),
        title: "",
        company: "",
        startYear: "",
        endYear: "",
        description: "",
      });
    },
    updateExperience(state, action) {
      const { id, field, value } = action.payload; 
      const index = state.resumeDetails.experiences.findIndex((exp) => exp.id === id);
      if (index !== -1) {
        (state.resumeDetails.experiences as Experience[])[index] = {
          ...state.resumeDetails.experiences[index],
          [field]: value,
        };
      }
    },
    removeExperience(state, action) {
      state.resumeDetails.experiences = state.resumeDetails.experiences.filter((exp) => exp.id !== action.payload);
    },

    addSkill(state, action) {
      state.resumeDetails.skills.push(action.payload);
    },
    removeSkill(state, action) {
      state.resumeDetails.skills = state.resumeDetails.skills.filter((skill) => skill !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserResumes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resumes = payload;
      })
      .addCase(getUserResumes.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(uploadUserResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadUserResume.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resumes.unshift(payload);
      })
      .addCase(uploadUserResume.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(deleteUserResume.fulfilled, (state, { payload }) => {
        state.resumes = state.resumes.filter((resume) => resume.resume_url !== payload);
      });

    builder
      .addCase(getUserResumeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserResumeDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resumeDetails = {
            introduction: payload.introduction || "",
            educations: Array.isArray(payload.educations) ? payload.educations : [],
            experiences: Array.isArray(payload.experiences) ? payload.experiences : [],
            skills: Array.isArray(payload.skills) ? payload.skills : [],
          };
      })
      .addCase(getUserResumeDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });

    builder
      .addCase(saveUserResumeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveUserResumeDetails.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.resumeDetails = {
            introduction: payload.introduction || "",
            educations: Array.isArray(payload.educations) ? payload.educations : [],
            experiences: Array.isArray(payload.experiences) ? payload.experiences : [],
            skills: Array.isArray(payload.skills) ? payload.skills : [],
        };
      })
      .addCase(saveUserResumeDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const {
  setIntroduction,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addSkill,
  removeSkill,
} = resumeSlice.actions;

export default resumeSlice.reducer;
