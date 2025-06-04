"use client"
import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/shape/shape_07.svg";
import shape_2 from "@/assets/images/shape/shape_07.svg";
import shape_3 from "@/assets/images/shape/shape_07.svg";
import { how_works_data } from "@/data/how-works-data";
import LocalizedHowWorksItem from "../common/LocalizedHowWorksItem";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const HowItWorks = () => {
  const headerTitle1 = useLocalizedContent("How it’s ", "如何");
  const headerTitle2 = useLocalizedContent("work?", "运作？");

  return (
    <section className="how-it-works position-relative bg-color pt-110 lg-pt-80 pb-110 lg-pb-70">
      <div className="container">
        <div className="title-one text-center mb-65 lg-mb-40 wow fadeInUp" data-wow-delay="0.3s">
          <h2 className="text-white">
            {headerTitle1}
            <span className="position-relative">
              {headerTitle2}
              <Image
                src={shape_1}
                alt="shape"
                className="lazy-img shapes shape"
              />
            </span>
          </h2>
        </div>

        <div className="row justify-content-center">
          {how_works_data.map((item) => (
            <LocalizedHowWorksItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_3} alt="shape" className="lazy-img shapes shape_02" />
    </section>
  );
};

export default HowItWorks;
