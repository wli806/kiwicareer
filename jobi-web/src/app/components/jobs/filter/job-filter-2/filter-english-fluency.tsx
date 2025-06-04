"use client";
import React, { useEffect, useState } from "react";
import NewNiceSelect from "@/ui/new-select";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setEnglishFluency } from "@/redux/features/filterSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const FilterEnglishFluency = () => {
  const dispatch = useAppDispatch();
  const { english_fluency } = useAppSelector((state) => state.filter);

  const isChinese = useAppSelector((state) => state.common.isChinese);

  // const fluencyLevels = ["Any Level", "Basic", "Conversational", "Fluent", "Native/Bilingual"];

  const fluencyLevels = [
    { value: "", label_en: "Any Level", label_zh: "不限" },
    { value: "Basic", label_en: "Basic", label_zh: "基础" },
    { value: "Conversational", label_en: "Conversational", label_zh: "口语" },
    { value: "Fluent", label_en: "Fluent", label_zh: "流利" },
    { value: "Native/Bilingual", label_en: "Native/Bilingual", label_zh: "母语/双语" },
  ];

  // const options = fluencyLevels.map((level) => ({
  //   value: level === "Any Level" ? "" : level,
  //   label: level,
  // }));

  const options = fluencyLevels.map((level) => ({
    value: level.value,
    label: isChinese ? level.label_zh : level.label_en,
  }));

  const [selectedFluency, setSelectedFluency] = useState("");

  useEffect(() => {
    if (english_fluency) {
      setSelectedFluency(english_fluency);
    } else {
      setSelectedFluency(""); 
    }
  }, [english_fluency]);

  const handleEnglishFluency = (item: { value: string; label: string }) => {
    setSelectedFluency(item.value);
    dispatch(setEnglishFluency(item.value));
  };

  const filterTitle = useLocalizedContent("English Fluency", "英语水平");
  const placeholderText = useLocalizedContent("Select English Fluency", "选择英语水平");

  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">{filterTitle}</div>
      <NewNiceSelect
        value={selectedFluency}
        options={options}
        placeholder={placeholderText}
        onChange={handleEnglishFluency}
        cls="bg-white"
        name="English Fluency"
      />
    </div>
  );
};

export default FilterEnglishFluency;
