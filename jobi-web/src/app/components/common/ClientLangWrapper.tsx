"use client";
import React from "react";
import { useAppSelector } from "@/redux/hook";

const ClientLangWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isChinese } = useAppSelector((state) => state.common);
  return <div className={isChinese ? "zh" : ""}>{children}</div>;
};

export default ClientLangWrapper;
