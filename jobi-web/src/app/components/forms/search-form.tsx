"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import JobCategorySelect from "../select/job-category";
import {
  setSearchKey
} from "@/redux/features/filterSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    location,
    search_key,
    job_type,
    english_fluency,
    experience,
    category,
    salaryRange
  } = useAppSelector((state) => state.filter);

  const maxPrice = 120;

  const searchQuestion = useLocalizedContent(
    "What are you looking for?",
    "您在找什么岗位？"
  );
  const keywordPlaceholder = useLocalizedContent(
    "Search by Keywords",
    "按关键字搜索"
  );
  const categoryLabel = useLocalizedContent("Category", "分类");
  const searchButtonText = useLocalizedContent("Search", "搜索");

  // **🔹 处理搜索框输入**
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKey(e.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (search_key) params.set("keyword", search_key);
    if (location) params.set("location", location);
    if (job_type.length) params.set("job_type", job_type.join(","));
    if (english_fluency.length) params.set("english_fluency", english_fluency);
    if (experience.length) params.set("experience", experience.join(","));
    if (category.length) params.set("category", category.join(","));

    // **薪资范围**
    if (salaryRange[0] > 0) params.set("min_salary", salaryRange[0].toString());
    if (salaryRange[1] < maxPrice) params.set("max_salary", salaryRange[1].toString());

    // **前端 URL 传递参数**
    router.push(`/job-grid-v2?${params.toString()}`);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-5">
          <div className="input-box">
            <div className="label">{searchQuestion}</div>
            <input 
              type="text"
              placeholder={keywordPlaceholder}
              value={search_key}
              onChange={handleSearch}
              className="no-border-input"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-box border-left">
            <div className="label">{categoryLabel}</div>
            <JobCategorySelect />
          </div>
        </div>
        <div className="col-md-3">
          <button className="fw-500 text-uppercase h-100 tran3s search-btn">
           {searchButtonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
