"use client";
// import NiceSelect from "@/ui/nice-select";
import React, { useEffect, useState } from "react";
import NewNiceSelect from "@/ui/new-select";

type SelectYearProps = {
  value?: string;
  onChange?: (year: string) => void;
};

const SelectYear: React.FC<SelectYearProps> = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const [yearOptions, setYearOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    // 生成最近 50 年的选项
    const generatedYears = Array.from({ length: 50 }, (_, i) => {
      const y = `${currentYear - i}`;
      return { value: y, label: y };
    });
    // 把 "Up to Now" 放到最前
    generatedYears.unshift({ value: "Up to Now", label: "Up to Now" });
    setYearOptions(generatedYears);
  }, [currentYear]);

  // 如果父级没给 value，就默认当前年
  useEffect(() => {
    if ((value === undefined || value === null) && onChange && yearOptions.length > 0) {
      onChange(String(currentYear));
    }
  }, [value, onChange, yearOptions, currentYear]);

  const handleYearChange = (item: { value: string; label: string }) => {
    onChange?.(item.value);
  };

  return (
    <div className="dash-input-wrapper mb-30">
      <NewNiceSelect
        // 用受控方式：传递一个字符串value
        value={value}
        options={yearOptions}
        placeholder="Select Year"
        onChange={handleYearChange}
        name="Year"
      />
    </div>
  );
};

export default SelectYear;
