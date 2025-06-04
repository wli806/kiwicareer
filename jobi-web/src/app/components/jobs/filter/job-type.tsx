"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setJobType } from "@/redux/features/filterSlice";

// 预定义的工作类型列表
const jobTypeOptions = [
  { value: "Full-Time", label_en: "Full-Time", label_zh: "全职" },
  { value: "Part-Time", label_en: "Part-Time", label_zh: "兼职" },
  { value: "Contract", label_en: "Contract", label_zh: "合同" },
  { value: "Internship", label_en: "Internship", label_zh: "实习" },
  { value: "Temporary", label_en: "Temporary", label_zh: "临时" },
  { value: "Freelance", label_en: "Freelance", label_zh: "自由职业" },
];

export function JobTypeItems({ showLength = true }: { showLength?: boolean }) {
  const { job_type } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const isChinese = useAppSelector((state) => state.common.isChinese);

  return (
    <>
      {jobTypeOptions.map(({ value, label_en, label_zh }) => (
        <li key={value}>
          <input
            onChange={() => dispatch(setJobType(value))}
            type="checkbox"
            name="JobType"
            value={value}
            checked={job_type.includes(value)}
          />
          <label>
            {isChinese ? label_zh : label_en}{" "}
            {showLength && (
              <span>{/* 这里可以填入与 `job_data` 相关的统计数据 */}</span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

const JobType = () => {
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        <JobTypeItems />
      </ul>
    </div>
  );
};

export default JobType;
