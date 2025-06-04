"use client"
import React from "react";
import JobCategorySelect from "@/app/components/select/job-category";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const FilterCategory = () => {
  const titleText = useLocalizedContent("Category", "分类");

  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">{titleText}</div>
      <JobCategorySelect />
    </div>
  );
};

export default FilterCategory;
