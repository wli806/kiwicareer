"use client"
import React from "react";
import { JobExperienceItems } from "../job-experience";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const FilterExperience = () => {
  const titleText = useLocalizedContent("Experience Level:", "经验要求:");

  return (
    <div className="filter-block d-xl-flex pb-25">
      <div className="filter-title fw-500 text-dark mt-1">
        {titleText}
      </div>
      <div className="main-body ps-xl-4 flex-fill">
        <ul className="style-none filter-input">
          <JobExperienceItems showLength={false} />
        </ul>
      </div>
    </div>
  );
};

export default FilterExperience;
