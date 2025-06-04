"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setSearchKey } from "@/redux/features/filterSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const { search_key } = useAppSelector((state) => state.filter);

  const titleText = useLocalizedContent("Keyword or Title", "关键词或标题");
  const placeholderText = useLocalizedContent("Search by Keywords", "按关键词搜索");

  // handle search 
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKey(e.target.value))
  }
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">{titleText}</div>
      <form className="input-box position-relative">
        <input value={search_key} onChange={handleSearch} type="text" placeholder={placeholderText} />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
