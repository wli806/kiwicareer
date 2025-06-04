import React from "react";
import Link from "next/link";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface LocalizedMenuItemProps {
  title_en: string;
  title_zh?: string; // 设为可选
  link: string;
  className?: string;
}

const LocalizedMenuItem: React.FC<LocalizedMenuItemProps> = ({
  title_en,
  title_zh,
  link,
  className = "",
}) => {
  // 如果 title_zh 为空，则默认使用 title_en
  const localizedTitle = useLocalizedContent(title_en, title_zh ?? title_en);
  return (
    <li className={`nav-item ${className}`}>
      <Link className="nav-link" href={link} role="button">
        {localizedTitle}
      </Link>
    </li>
  );
};

export default LocalizedMenuItem;
