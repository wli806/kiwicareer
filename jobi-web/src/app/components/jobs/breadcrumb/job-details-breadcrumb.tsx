"use client";
import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const JobDetailsBreadcrumb = () => {

  const titleText = useLocalizedContent("Job Details", "职位详情");
  const subtitleText = useLocalizedContent(
    "Here will be your company job details & requirements",
    "职位详情与要求"
  );

  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-6 m-auto text-center">
              <div className="title-two">
                <h2 className="text-white">{titleText}</h2>
              </div>
              <p className="text-lg text-white mt-30 lg-mt-20">
                {subtitleText}
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

export default JobDetailsBreadcrumb;
