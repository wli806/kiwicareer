"use client";
import React from 'react';
import Image from 'next/image';
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
// internal
import icon from '@/assets/images/icon/icon_11.svg';
import shape_1 from '@/assets/images/shape/shape_12.svg';
import shape_2 from '@/assets/images/shape/shape_13.svg';
import shape_3 from '@/assets/images/shape/shape_14.svg';
import banner_img from '@/assets/images/assets/homepage_cv_banner.png';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const FancyBanner = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const titlePart1 = useLocalizedContent("Get your", "获取你的");
  const titlePart2 = useLocalizedContent("Matched Jobs", "匹配职位");
  const paragraphText = useLocalizedContent(
    "Find your dream job & earn from leading brands. Upload your CV now.",
    "找到你的理想工作并从顶级品牌获得报酬。立即上传简历！"
  );
  const btnText = useLocalizedContent("Upload your CV", "上传简历");

  const handleUploadClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // 如果未登录，则通过隐藏链接触发登录弹窗
      const loginTrigger = document.getElementById("loginModalTrigger");
      if (loginTrigger) {
        loginTrigger.click();
      }
    } else {
      // 如果已登录，跳转到 dashboard 页面
      router.push("/dashboard/candidate-dashboard/resume");
    }
  };

  return (
    <section className="fancy-banner-one mt-150 xl-mt-120 lg-mt-100">
      <div className="container">
        <div className="bg-wrapper position-relative ps-4 pe-4 pt-55 wow fadeInUp">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-xl-5 col-lg-6 order-lg-last">
                  <div className="text-wrapper">
                    <div className="title-two">
                      <h2 className="text-white">{titlePart1}<br /> <span>{titlePart2}</span></h2>
                    </div>
                    <p className="text-md mt-25 lg-mt-20 mb-45 lg-mb-30">{paragraphText}</p>
                    <form action="#" className="upload-btn position-relative d-flex align-items-center justify-content-center">
                      <Image src={icon} alt="icon" className="lazy-img" /> <span onClick={handleUploadClick} className="fw-500 ms-2 text-dark">{btnText}</span>
                      {/* <input type="file" id="uploadCV" name="uploadCV" /> */}
                    </form>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6 order-lg-first">
                  <div className="img-meta md-mt-20 position-relative d-none d-md-block">
                    <Image src={banner_img} alt="banner_img" className="lazy-img m-auto" />
                    <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
                    <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
                  </div>
                  <div className="d-block d-md-none mb-30"></div>
                </div>
              </div>
            </div>
          </div>
          <Image src={shape_3} alt="shape" className="lazy-img shapes shape_03" />
        </div>
      </div>
      
      <a
        id="loginModalTrigger"
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
        className="d-none"
      ></a>

    </section>
  );
};

export default FancyBanner;