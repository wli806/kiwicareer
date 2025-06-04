"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import type { ICategoryItem } from "@/types/category-type";

interface LocalizedCategoryItemProps extends ICategoryItem {
  active?: boolean;
}

const LocalizedCategoryItem: React.FC<LocalizedCategoryItemProps> = ({
  icon,
  title,
  title_zh,
  count,
  link,
  active = false,
}) => {
  const localizedTitle = useLocalizedContent(title, title_zh ?? title);
  return (
    <div className="card-style-one text-center mt-20 wow fadeInUp" data-wow-delay="0.1s">
      <Link href={link || "/job-grid-v2"} className={`bg wrapper ${active ? "active" : ""}`}>
        <div className="icon d-flex align-items-center justify-content-center">
          <Image src={icon} alt="icon" className="lazy-img" />
        </div>
        <div className="title fw-500">{localizedTitle}</div>
        {/* 如果需要显示 count，可以添加：
        <div className="total-job">{count}</div> */}
      </Link>
    </div>
  );
};

export default LocalizedCategoryItem;
