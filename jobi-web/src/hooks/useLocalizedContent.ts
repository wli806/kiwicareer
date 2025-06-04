"use client";
import { useAppSelector } from "@/redux/hook";
import { useState, useEffect } from "react";

export function useLocalizedContent(en: string, zh: string): string {

  const isChinese = useAppSelector((state) => state.common.isChinese);
  const [content, setContent] = useState(en);

  useEffect(() => {
    setContent(isChinese ? zh : en);
  }, [isChinese, en, zh]);

  return content;
}
