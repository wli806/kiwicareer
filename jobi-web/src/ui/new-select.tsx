"use client"
import React, { useState, useCallback, useRef } from "react";
import { useClickAway } from "react-use";

type Option = {
  value: string;
  label: string;
};

type IPropType = {
  // 改成使用受控: 父组件给一个明确的值。
  value: string | undefined;
  options: Option[];
  placeholder?: string;
  cls?: string;
  onChange: (item: Option) => void;
  name: string;
};

const NewNiceSelect = ({
  value,
  options,
  placeholder,
  cls,
  onChange,
  name,
}: IPropType) => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  // 根据 props.value 找到对应 Option, 用于渲染界面
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (item: Option) => {
    onChange(item);
    onClose();
  };

  return (
    <div
      className={`nice-select ${cls || ""} ${open ? "open" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      ref={ref}
    >
      <span className="current">
        {selectedOption?.label || placeholder || "Select an option"}
      </span>
      <ul className="list" role="menubar" onClick={(e) => e.stopPropagation()}>
        {options?.map((item, i) => {
          const isSelected = item.value === selectedOption?.value;
          return (
            <li
              key={i}
              data-value={item.value}
              className={`option ${isSelected ? "selected focus" : ""}`}
              role="menuitem"
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewNiceSelect;
