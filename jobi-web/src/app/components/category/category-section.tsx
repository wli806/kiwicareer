"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import shape_1 from "@/assets/images/shape/shape_04.svg";
import shape_2 from "@/assets/images/shape/shape_05.svg";
import category_dropdown from "@/data/category-dropdown";
import LocalizedCategoryItem from "../common/LocalizedCategoryItem";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const CategorySection = () => {
  const category_items = category_dropdown.flatMap(
    (category) => category.category_items
  );

  const headerTitleBefore = useLocalizedContent("Most ", "最");
  const headerTitleHighlighted = useLocalizedContent("Demanding", "热门");
  const headerTitleAfter = useLocalizedContent("Categories.", "类别");
  
  const headerDesc = useLocalizedContent(
    "Explore a wide range of in-demand fields and discover career opportunities tailored to your strengths.",
    "探索广泛需求领域，发现专为您的优势定制的职业机会。"
  );
  const btnText = useLocalizedContent("Explore all fields", "浏览全部领域");

  return (
    <section className="category-section-one bg-color position-relative pt-180 xl-pt-150 lg-pt-80 pb-140 xl-pb-120 lg-pb-60">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-one wow fadeInUp" data-wow-delay="0.3s">
              <h2>
                {headerTitleBefore}
                <span className="position-relative">
                  {headerTitleHighlighted}
                  <Image
                    src={shape_1}
                    alt="shape"
                    className="lazy-img shapes shape"
                  />
                </span>
                {headerTitleAfter}
              </h2>
            </div>
          </div>
          <div className="col-xxl-5 col-lg-6">
            <p className="text-md mb-25 lg-mb-10 md-mt-20">
              {headerDesc}
            </p>
            <Link href="/job-grid-v2"
              className="btn-two d-none d-lg-inline-block"
            >
              {btnText}
            </Link>
          </div>
        </div>
        
        <div className="card-wrapper row justify-content-center mt-75 lg-mt-40 md-mt-10">
          {category_items.map((item, i) => (
            <LocalizedCategoryItem key={item.id} {...item} active={i === 0} data-wow-delay={`0.1${i + 1}s`} />
          ))}
        </div>

        <div className="text-center mt-40 d-lg-none">
          <Link href="/job-grid-v2" className="btn-two">
            {btnText}
          </Link>
        </div>
      </div>
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_01" />
    </section>
  );
};

export default CategorySection;
