"use client";
import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface CommonBreadcrumbProps {
  title: string;
  subtitle: string;
  title_zh?: string;     // 可选的中文标题
  subtitle_zh?: string;  // 可选的中文副标题
}

const CommonBreadcrumb: React.FC<CommonBreadcrumbProps> = ({
  title,
  subtitle,
  title_zh,
  subtitle_zh,
}) => {
  const localizedTitle = useLocalizedContent(title, title_zh || title);
  const localizedSubtitle = useLocalizedContent(subtitle, subtitle_zh || subtitle);

  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-6 m-auto text-center">
              <div className="title-two">
                <h2 className="text-white">{localizedTitle}</h2>
              </div>
              <p className="text-lg text-white mt-30 lg-mt-20">
                {localizedSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default CommonBreadcrumb;
