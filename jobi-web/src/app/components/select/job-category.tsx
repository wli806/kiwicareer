"use client"
import React, { useEffect, useState } from "react";
import NewNiceSelect from "@/ui/new-select";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCategory } from "@/redux/features/filterSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { categoryMapping } from "@/utils/categoryMapping";

const JobCategorySelect = () => {
  const dispatch = useAppDispatch();
  const { category, categories } = useAppSelector((state) => state.filter);
  const isChinese = useAppSelector((state) => state.common.isChinese);

  const anyCategoryText = useLocalizedContent("Any Category", "任何类别");
  const selectCategoryPlaceholder = useLocalizedContent("Select Category", "选择类别");
  const categoryName = useLocalizedContent("Category", "类别");

  const options = [
    { value: "", label: anyCategoryText },
    ...categories.map((c) => ({
      value: c,
      label: isChinese && categoryMapping[c] ? categoryMapping[c] : c,
    })),
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (category.length > 0) {
      setSelectedCategory(category[0]);
    } else {
      setSelectedCategory("");
    }
  }, [category]);

  const handleCategory = (item: { value: string; label: string }) => {
    const newCategory = item.value ? [item.value] : [];
    setSelectedCategory(item.value);
    dispatch(setCategory(newCategory));
  };

  return (
    <NewNiceSelect
      value={selectedCategory}
      options={options}
      placeholder={selectCategoryPlaceholder}
      onChange={handleCategory}
      cls="bg-white"
      name={categoryName}
    />
  );
};

export default JobCategorySelect;
