import React, { useState } from "react";
import InputRange from "@/ui/input-range";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setSalaryRange } from "@/redux/features/filterSlice";

// prop type
// type IProps = {
//   priceValue: number[];
//   setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
//   maxPrice: number;
// };
// Salary Range Slider
export function SalaryRangeSlider({ maxPrice }: { maxPrice: number }) {

  const dispatch = useAppDispatch();
  const salaryRange = useAppSelector((state) => state.filter.salaryRange);

  // handleChanges
  const handleChanges = (val: number[]) => {
    dispatch(setSalaryRange(val));
  };

  return (
    <div className="salary-slider">
      <div className="price-input d-flex align-items-center pt-5">
        <div className="currency ps-1">$ &nbsp;</div>
        <div className="field d-flex align-items-center">
          <input
            type="number"
            className="input-min"
            value={salaryRange[0]}
            readOnly
          />
        </div>
        <div className="pe-1 ps-1">-</div>
        <div className="field d-flex align-items-center">
          <input
            type="number"
            className="input-max"
            value={salaryRange[1]}
            readOnly
          />
        </div>
        <div className="currency ps-1">/ Hour</div>
      </div>
      <div className="range-input mb-10">
        <InputRange
          MAX={maxPrice}
          MIN={0}
          STEP={1}
          values={salaryRange}
          handleChanges={handleChanges}
        />
      </div>
    </div>
  );
}

const JobPrices = ({ maxPrice }: { maxPrice: number }) => {
  return (
    <div className="main-body">
      <SalaryRangeSlider
        maxPrice={maxPrice}
      />
      <ul className="style-none d-flex flex-wrap justify-content-between radio-filter mb-5">
        <li>
          <input type="radio" name="jobDuration" defaultValue="01" />
          <label>Weekly</label>
        </li>
        <li>
          <input type="radio" name="jobDuration" defaultValue="02" />
          <label>Monthly</label>
        </li>
        <li>
          <input type="radio" name="jobDuration" defaultValue="03" />
          <label>Hourly</label>
        </li>
      </ul>
    </div>
  );
};

export default JobPrices;
