"use client";
import React, { useEffect } from "react";
import SearchFilter from "./search-filter";
import FilterCategory from "./filter-category";
import FilterLocation from "./filter-location";
import FilterJobType from "./filter-job-type";
import FilterExperience from "./filter-experience";
import { SalaryRangeSlider } from "../job-prices";
import FilterEnglishFluency from "./filter-english-fluency";
import {
  setLocation, setSearchKey, setJobType, 
  setEnglishFluency, setExperience, setCategory, 
  setSalaryRange, resetFilter
} from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// prop type
type IProps = {
  priceValue: number[];
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxPrice: number;
};

const FilterAreaTwo = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 读取 Redux Store 中的筛选条件
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


  const filterByText = useLocalizedContent("Filter By", "筛选");
  const salaryRangeLabel = useLocalizedContent("Salary Range :", "薪资范围:");
  const applyFilterText = useLocalizedContent("Apply Filter", "应用筛选");
  const resetFilterText = useLocalizedContent("Reset Filter", "重置筛选");

  // **监听 URL 变化，自动同步到 Redux**
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const location = params.get("location") || "";
    const searchKey = params.get("keyword") || "";

    const jobTypes = params.get("job_type")
      ? decodeURIComponent(params.get("job_type")!).split(",").filter(Boolean)
      : [];

    const englishFluency = params.get("english_fluency") || ""
    const experienceLevels = params.get("experience")
      ? decodeURIComponent(params.get("experience")!).split(",").filter(Boolean)
      : [];

    const categories = params.get("category")
      ? decodeURIComponent(params.get("category")!).split(",").filter(Boolean)
      : [];

    const minSalary = parseFloat(params.get("min_salary") || "0");
    const maxSalary = parseFloat(params.get("max_salary") || "120");

    // **批量更新 Redux Store**
    dispatch(setLocation(location));
    dispatch(setSearchKey(searchKey));
    dispatch(setJobType(jobTypes)); 
    dispatch(setEnglishFluency(englishFluency));
    dispatch(setExperience(experienceLevels));
    dispatch(setCategory(categories));

    // **更新薪资范围**
    dispatch(setSalaryRange([minSalary, maxSalary]));

  }, [searchParams, dispatch]);

  // useEffect(() => {
  //   if (!searchParams.toString()) return; // 如果 URL 为空，则不更新 Redux
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (!location && params.get("location")) dispatch(setLocation(params.get("location")!));
  //   if (!search_key && params.get("keyword")) dispatch(setSearchKey(params.get("keyword")!));
  //   if (!job_type.length && params.get("job_type")) dispatch(setJobType(params.get("job_type")!.split(",")));
  //   if (!english_fluency.length && params.get("english_fluency")) dispatch(setEnglishFluency(params.get("english_fluency")!.split(",")));
  //   if (!experience.length && params.get("experience")) dispatch(setExperience(params.get("experience")!.split(",")));
  //   if (!category.length && params.get("category")) dispatch(setCategory(params.get("category")!.split(",")));
  // }, []);

  // **重置筛选**
  const handleReset = () => {
    dispatch(resetFilter());
    router.push("/job-grid-v2");
  };

  // **应用筛选**
  const handleApplyFilter = () => {
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
    <div className="filter-area-tab">
      <div className="light-bg border-20 ps-4 pe-4">
        <a
          className="filter-header border-20 d-block collapsed"
          data-bs-toggle="collapse"
          href="#collapseFilterHeader"
          role="button"
          aria-expanded="false"
        >
          <span className="main-title fw-500 text-dark">{filterByText}</span>
        </a>
        <div className="collapse border-top" id="collapseFilterHeader">
          <div className="pt-25 pb-30">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <SearchFilter />
              </div>
              <div className="col-lg-3 col-sm-6">
                <FilterCategory />
              </div>
              <div className="col-lg-3 col-sm-6">
                <FilterLocation />
              </div>
              <div className="col-lg-3 col-sm-6">
                <FilterEnglishFluency/>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <FilterJobType />
              </div>
              <div className="col-lg-4 col-sm-6">
                <FilterExperience />
              </div>
              <div className="col-lg-4">
                <div className="filter-block d-xl-flex pb-25">
                  <div className="filter-title fw-500 text-dark mt-1">
                    {salaryRangeLabel}
                  </div>
                  <div className="main-body ps-xl-4 flex-fill">
                    <SalaryRangeSlider
                      maxPrice={maxPrice}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-2 m-auto">
                {/* Apply Filter 按钮 */}
                <button
                  onClick={handleApplyFilter}
                  className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30 md-mt-10"
                >
                  {applyFilterText}
                </button>
              </div>

              <div className="col-xl-2 m-auto">
                <button onClick={handleReset}
                  className="btn-reset fw-500 text-white w-100 text-center tran3s mt-30 md-mt-10"
                >
                  {resetFilterText}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterAreaTwo;
