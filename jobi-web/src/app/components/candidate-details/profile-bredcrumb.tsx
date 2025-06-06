"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import shape_1 from '@/assets/images/shape/shape_02.svg';
import shape_2 from '@/assets/images/shape/shape_03.svg';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface CommonBreadcrumbProps {
  title: string;
  subtitle: string;
  title_zh?: string;
  subtitle_zh?: string;
}

const ProfileBreadcrumb: React.FC<CommonBreadcrumbProps> = ({
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
              {/* <ul className="style-none d-flex justify-content-center page-pagination mt-15">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                </li>
                <li>{subtitle}</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      <Image
        src={shape_1}
        alt="shape"
        className="lazy-img shapes shape_01"
      />
      <Image
        src={shape_2}
        alt="shape"
        className="lazy-img shapes shape_02"
      />
    </div>
  );
};

export default ProfileBreadcrumb;
