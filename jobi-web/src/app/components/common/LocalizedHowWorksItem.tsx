"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import type { how_works_type } from "@/types/how-it-works-type";

interface LocalizedHowWorksItemProps extends how_works_type {
  active?: boolean;
}

const LocalizedHowWorksItem: React.FC<LocalizedHowWorksItemProps> = ({
  icon,
  title,
  title_zh,
  sub_title,
  sub_title_zh,
  active = false,
}) => {
  const localizedTitle = useLocalizedContent(title, title_zh ?? title);
  const localizedSubtitle = useLocalizedContent(sub_title, sub_title_zh ?? sub_title);
  
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6">
      <div className="card-style-two text-center mt-25 wow fadeInUp">
        <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
          <Image src={icon} alt="icon" className="lazy-img" />
        </div>
        <div className="title fw-500 text-white">{localizedTitle}</div>
        <p>{localizedSubtitle}</p>
      </div>
    </div>
  );
};

export default LocalizedHowWorksItem;
