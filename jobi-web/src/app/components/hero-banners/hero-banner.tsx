"use client"
import React from 'react';
import Image from 'next/image';
// internal
import shape_1 from '@/assets/images/shape/shape_01.svg';
import shape_2 from '@/assets/images/shape/shape_02.svg';
import shape_3 from '@/assets/images/shape/shape_03.svg';
import main_img from '@/assets/images/assets/banner.png';
import SearchForm from '../forms/search-form';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const HeroBanner = () => {

  const heading = useLocalizedContent("Find Dream Job", "寻找理想工作");
  const subHeading = useLocalizedContent("Join the top 3% of talent on KiwiCareer", "加入 KiwiCareer 顶尖 3% 人才行列");
  const paragraph = useLocalizedContent("We delivered blazing fast & striking work solution", "我们提供极速且卓越的求职解决方案");
  const popularLabel = useLocalizedContent("Popular:", "热门:");
  const engineering = useLocalizedContent("Engineering", "工程类");
  const accounting = useLocalizedContent("Accounting", "会计");
  const ict = useLocalizedContent("ICT", "信息与通信技术");
  const sales = useLocalizedContent("Sales", "销售");

  return (
    <div className="hero-banner-one position-relative">
      <div className="container">
        <div className="position-relative pt-200 md-pt-150 pb-150 xl-pb-120 md-pb-80">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="wow fadeInUp"
              data-wow-delay="0.3s">{heading} <span>{subHeading}</span></h1>
              <p className="text-lg text-white mt-40 md-mt-30 mb-50 md-mb-30 wow fadeInUp"
              data-wow-delay="0.4s">{paragraph}</p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="job-search-one position-relative me-xl-5 wow fadeInUp"
                  data-wow-delay="0.5s">
                  {/* search form start */}
                  <SearchForm/>
                  {/* search form end */}
                  <ul className="tags d-flex flex-wrap style-none mt-20">
                    <li className="fw-500 text-white me-2">{popularLabel}</li>
                    <li><a href="/job-grid-v2?category=Engineering">{engineering}</a></li>
                    <li><a href="/job-grid-v2?category=Accounting">&nbsp;{accounting}</a></li>
                    <li><a href="/job-grid-v2?category=Information+%26+Communication+Technology">&nbsp; {ict}</a></li>
                    <li><a href="/job-grid-v2?category=Sales">&nbsp; {sales}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="img-box">
            <Image src={shape_1} alt="shape" className="lazy-img shapes" />
            <Image src={main_img} alt="main-img" className="lazy-img main-img w-100" />
          </div>
        </div>
      </div>
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_3} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default HeroBanner;