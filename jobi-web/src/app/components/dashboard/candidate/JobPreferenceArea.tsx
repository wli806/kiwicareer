"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useAppSelector } from "@/redux/hook";
import { categoryMapping, jobTypeMapping } from "@/utils/categoryMapping";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

type JobPreferenceProps = {
  profileData: {
    isRecommandRequired: boolean;
    wishedJobCategories: string[];
    wishedJobLocations: string[];
    wishedJobTypes: string[];
  };
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  handleToggleEmailPush: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 定义外层 FormControl 的样式
const formControlSx = { 
  maxWidth: "600px" 
};

// 定义 InputLabel 的样式
const inputLabelSx = {
  color: "#3f634d",
  fontWeight: 500,
  "&.Mui-focused": { color: "#02bf58" },
};

// 定义 Select 组件的样式
const selectSx = {
//   backgroundColor: "#f7f7f7",
  border: "1px solid #d9e0dc",
  borderRadius: "8px",
  color: "#3f634d",
  fontSize: "1rem",
  fontWeight: 500,
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover": { backgroundColor: "#eef4f1" },
  "&.Mui-focused": {
    border: "1px solid #02bf58",
    backgroundColor: "#eef4f1",
  },
};

// 定义下拉菜单 Paper 的样式
const menuPropsSx = {
  PaperProps: {
    sx: {
      backgroundColor: "#f7f7f7",
      border: "1px solid #d9e0dc",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxHeight: 300
    },
  },
};

// 定义 MenuItem 的默认样式
const menuItemSx = {
  fontSize: "0.95rem",
  color: "#3f634d",
  "&:hover": { backgroundColor: "#d9e0dc" },
};

// 定义 MenuItem 被选中时的样式
const menuItemSelectedSx = {
  "&.Mui-selected": {
    backgroundColor: "#02bf58",
    color: "#ffffff",
    "&:hover": { backgroundColor: "#3f634d" },
  },
};


const JobPreferenceArea = ({
  profileData,
  setProfileData,
  handleToggleEmailPush,
}: JobPreferenceProps) => {
  // 下拉框当前选中的值（尚未添加到列表）
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  const { categories, locations, jobTypes } = useAppSelector((state) => state.filter);
  const filteredLocations = locations.filter((loc) => !loc.includes(","));
  const isChinese = useAppSelector((state) => state.common.isChinese);

  // 本地化文本
  const jobPrefTitle = useLocalizedContent("Job Preferences", "岗位偏好");
  const emailPushLabel = useLocalizedContent(
    "Receive Recommended Job Emails",
    "接收推荐岗位邮件"
  );
  const preferredJobCategoriesLabel = useLocalizedContent(
    "Preferred Job Categories",
    "期望的岗位分类"
  );
  const preferredJobLocationsLabel = useLocalizedContent(
    "Preferred Job Locations",
    "期望的工作地区"
  );
  const preferredJobTypesLabel = useLocalizedContent(
    "Preferred Job Types",
    "期望的岗位类型"
  );
  const selectCategoryPlaceholder = useLocalizedContent("Select Category", "选择分类");
  const selectLocationPlaceholder = useLocalizedContent("Select Location", "选择地区");
  const selectJobTypePlaceholder = useLocalizedContent("Select Job Type", "选择类型");

  // 处理下拉框选中事件（仅 select 部分采用 MUI）
  const handleCategorySelect = (e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value as string);
  };
  const handleLocationSelect = (e: SelectChangeEvent) => {
    setSelectedLocation(e.target.value as string);
  };
  const handleJobTypeSelect = (e: SelectChangeEvent) => {
    setSelectedJobType(e.target.value as string);
  };

  // 添加选项到对应数组（避免重复添加）
  const handleAddCategory = () => {
    if (selectedCategory && !profileData.wishedJobCategories.includes(selectedCategory)) {
      setProfileData({
        ...profileData,
        wishedJobCategories: [...profileData.wishedJobCategories, selectedCategory],
      });
      setSelectedCategory("");
    }
  };
  const handleAddLocation = () => {
    if (selectedLocation && !profileData.wishedJobLocations.includes(selectedLocation)) {
      setProfileData({
        ...profileData,
        wishedJobLocations: [...profileData.wishedJobLocations, selectedLocation],
      });
      setSelectedLocation("");
    }
  };
  const handleAddJobType = () => {
    if (selectedJobType && !profileData.wishedJobTypes.includes(selectedJobType)) {
      setProfileData({
        ...profileData,
        wishedJobTypes: [...profileData.wishedJobTypes, selectedJobType],
      });
      setSelectedJobType("");
    }
  };

  // 移除选中的项
  const handleRemoveCategory = (cat: string) => {
    setProfileData({
      ...profileData,
      wishedJobCategories: profileData.wishedJobCategories.filter(
        (item: string) => item !== cat
      ),
    });
  };
  const handleRemoveLocation = (loc: string) => {
    setProfileData({
      ...profileData,
      wishedJobLocations: profileData.wishedJobLocations.filter(
        (item: string) => item !== loc
      ),
    });
  };
  const handleRemoveJobType = (jt: string) => {
    setProfileData({
      ...profileData,
      wishedJobTypes: profileData.wishedJobTypes.filter(
        (item: string) => item !== jt
      ),
    });
  };

  
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">{jobPrefTitle}</h4>

      {/* Email Toggle 使用 MUI Switch */}
      <FormControlLabel
        control={
            <Switch
            checked={profileData.isRecommandRequired}
            onChange={handleToggleEmailPush}
            sx={{
                // "& .MuiSwitch-thumb": {
                // backgroundColor: "#02bf58", // 绿色滑块
                // },
                "& .Mui-checked .MuiSwitch-thumb": {
                backgroundColor: "#90ee90", // 选中状态下的滑块颜色
                },
                "& .Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#90ee90", // 选中状态下的轨道颜色
                },
                "& .MuiSwitch-track": {
                backgroundColor: "#d9e0dc", // 默认未选中的轨道颜色
                },
            }}
            />
        }
        label={emailPushLabel}
        sx={{ mb: 4 }}
      />

      {/* 期望的岗位分类 */}
      <div className="dash-input-wrapper mb-40">
        <label>{preferredJobCategoriesLabel}</label>
        <div className="mb-2 d-flex" style={{ maxWidth: "800px" }}>
          <FormControl fullWidth variant="outlined" sx={formControlSx}>
            <InputLabel id="select-category-label" sx={inputLabelSx}>
              {preferredJobCategoriesLabel}
            </InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={selectedCategory}
              label={preferredJobCategoriesLabel}
              onChange={handleCategorySelect}
              sx={selectSx}
              MenuProps={menuPropsSx}
            >
              <MenuItem value="" sx={menuItemSx}>
                <em>{selectCategoryPlaceholder}</em>
              </MenuItem>
              {categories.map((cat, idx) => (
                <MenuItem key={idx} value={cat} sx={{ ...menuItemSx, ...menuItemSelectedSx }}>
                  {isChinese && categoryMapping[cat] ? categoryMapping[cat] : cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button className="dash-btn-one ms-2" onClick={handleAddCategory}>
            Add
          </button>
        </div>
        {profileData.wishedJobCategories &&
          profileData.wishedJobCategories.length > 0 && (
            <div className="skills-wrapper">
              <ul className="list-unstyled d-flex flex-wrap align-items-center">
                {profileData.wishedJobCategories.map((cat, idx) => (
                  <li key={idx} className="is_tag me-2 mb-2">
                    <button onClick={() => handleRemoveCategory(cat)}>
                     {isChinese && categoryMapping[cat] ? categoryMapping[cat] : cat} <i className="bi bi-x"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* 期望的工作地区 */}
      <div className="dash-input-wrapper mb-40">
        <label>{preferredJobLocationsLabel}</label>
        <div className="mb-2 d-flex" style={{ maxWidth: "800px" }}>
          <FormControl fullWidth variant="outlined" sx={formControlSx}>
            <InputLabel id="select-location-label" sx={inputLabelSx}>
              {preferredJobLocationsLabel}
            </InputLabel>
            <Select
              labelId="select-location-label"
              id="select-location"
              value={selectedLocation}
              label={preferredJobLocationsLabel}
              onChange={handleLocationSelect}
              sx={selectSx}
              MenuProps={menuPropsSx}
            >
              <MenuItem value="" sx={menuItemSx}>
                <em>{selectLocationPlaceholder}</em>
              </MenuItem>
              {filteredLocations.map((loc, idx) => (
                <MenuItem key={idx} value={loc} sx={{ ...menuItemSx, ...menuItemSelectedSx }}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button className="dash-btn-one ms-2" onClick={handleAddLocation}>
            Add
          </button>
        </div>
        {profileData.wishedJobLocations &&
          profileData.wishedJobLocations.length > 0 && (
            <div className="skills-wrapper">
              <ul className="list-unstyled d-flex flex-wrap align-items-center">
                {profileData.wishedJobLocations.map((loc, idx) => (
                  <li key={idx} className="is_tag me-2 mb-2">
                    <button onClick={() => handleRemoveLocation(loc)}>
                      {loc} <i className="bi bi-x"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* 期望的岗位类型 */}
      <div className="dash-input-wrapper mb-40">
        <label>{preferredJobTypesLabel}</label>
        <div className="mb-2 d-flex" style={{ maxWidth: "800px" }}>
          <FormControl fullWidth variant="outlined" sx={formControlSx}>
            <InputLabel id="select-jobtype-label" sx={inputLabelSx}>
              {preferredJobTypesLabel}
            </InputLabel>
            <Select
              labelId="select-jobtype-label"
              id="select-jobtype"
              value={selectedJobType}
              label={preferredJobTypesLabel}
              onChange={handleJobTypeSelect}
              sx={selectSx}
              MenuProps={menuPropsSx}
            >
              <MenuItem value="" sx={menuItemSx}>
                <em>{selectJobTypePlaceholder}</em>
              </MenuItem>
              {jobTypes.map((jt, idx) => (
                <MenuItem key={idx} value={jt} sx={{ ...menuItemSx, ...menuItemSelectedSx }}>
                  {isChinese && jobTypeMapping[jt] ? jobTypeMapping[jt] : jt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button className="dash-btn-one ms-2" onClick={handleAddJobType}>
            Add
          </button>
        </div>
        {profileData.wishedJobTypes &&
          profileData.wishedJobTypes.length > 0 && (
            <div className="skills-wrapper">
              <ul className="list-unstyled d-flex flex-wrap align-items-center">
                {profileData.wishedJobTypes.map((jt, idx) => (
                  <li key={idx} className="is_tag me-2 mb-2">
                    <button onClick={() => handleRemoveJobType(jt)}>
                      {isChinese && jobTypeMapping[jt] ? jobTypeMapping[jt] : jt}<i className="bi bi-x"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default JobPreferenceArea;
