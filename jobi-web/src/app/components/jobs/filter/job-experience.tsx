"use client";
import React from "react";
import { setExperience } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

// 预定义的经验级别列表
const experienceOptions = [
  { value: "No-Experience", label_en: "No Experience", label_zh: "无经验" },
  { value: "Fresher", label_en: "Fresher", label_zh: "初级" },
  { value: "Intermediate", label_en: "Intermediate", label_zh: "中级" },
  { value: "Senior", label_en: "Senior", label_zh: "高级" },
  { value: "Expert", label_en: "Expert", label_zh: "专家" },
];

export function JobExperienceItems({ showLength = true }: { showLength?: boolean }) {
  const { experience } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const isChinese = useAppSelector((state) => state.common.isChinese);

  return (
    <>
      {experienceOptions.map(({ value, label_en, label_zh }) => (
        <li key={value}>
          <input
            onChange={() => dispatch(setExperience(value))}
            type="checkbox"
            name="JobExperience"
            value={value}
            checked={experience.includes(value)}
          />
          <label>
            {isChinese ? label_zh : label_en}{" "}
            {showLength && <span>{/* 这里可以填入与 `job_data` 相关的统计数据 */}</span>}
          </label>
        </li>
      ))}
    </>
  );
}

const JobExperience = () => {
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        <JobExperienceItems />
      </ul>
    </div>
  );
};

export default JobExperience;
