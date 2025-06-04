"use client"
import React from "react";
import { JobTypeItems } from "../job-type";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const FilterJobType = () => {
  const titleText = useLocalizedContent("Job Type:", "工作类型:");

  return (
    <div className="filter-block d-xl-flex pb-25">
      <div className="filter-title fw-500 text-dark mt-1">{titleText} </div>
      <div className="main-body ps-xl-4 flex-fill">
        <ul className="style-none filter-input">
          <JobTypeItems showLength={false} />
        </ul>
      </div>
    </div>
  );
};

export default FilterJobType;
