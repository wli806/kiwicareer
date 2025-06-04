"use client";
import React from "react";
import NiceSelect from "@/ui/nice-select";

interface ShortSelectProps {
  onChange?: (value: string) => void;
}

const ShortSelect: React.FC<ShortSelectProps> = ({ onChange }) => {
  // 处理排序变化
  const handleShort = (item: { value: string; label: string }) => {
    if (onChange) {
      onChange(item.value);
    }
  };

  return (
    <NiceSelect
      options={[
        { value: "New", label: "New" },
        { value: "Category", label: "Category" },
        { value: "Job Type", label: "Job Type" },
      ]}
      defaultCurrent={0}
      onChange={handleShort}
      name="Short by"
    />
  );
};

export default ShortSelect;
