"use client"
import React from "react";
import JobLocations from "../job-locations";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";


const FilterLocation = () => {
  const titleText = useLocalizedContent("Location", "地区");

  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">{titleText}</div>
      <JobLocations/>
    </div>
  );
};

export default FilterLocation;
