"use client";
import React from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLocation } from "@/redux/features/filterSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const JobLocations = () => {
  const dispatch = useAppDispatch();
  const { location, locations } = useAppSelector((state) => state.filter);

  const anyLocationText = useLocalizedContent("Any Location", "任何位置");
  const selectLocationText = useLocalizedContent("Select a Location", "选择位置");

  const options = [
    { value: "", label: anyLocationText },
    ...locations.map((l) => ({
      value: l,
      label: l,
    })),
  ];

  const selectedValue = options.find((o) => o.value === location) || options[0];

  const handleLocation = (selectedOption: { value: string; label: string } | null) => {
    dispatch(setLocation(selectedOption ? selectedOption.value : ""));
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "45px",
      minHeight: "45px",
      border: "none",
      boxShadow: "none",
      backgroundColor: "#fff",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "45px",
      padding: "0 15px",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "45px",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: "8px",
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: "310px",
      overflowY: "auto",
      zIndex: 9999,
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
  

  return (
    <div className="filter-block pb-50 lg-pb-20">
      <Select
        options={options}
        value={selectedValue}
        onChange={handleLocation}
        isSearchable
        placeholder={selectLocationText}
        className="custom-select"
        styles={customStyles}
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default JobLocations;
