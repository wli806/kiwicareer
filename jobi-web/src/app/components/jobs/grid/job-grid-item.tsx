"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import { useAppSelector } from "@/redux/hook";
import { notifySuccess, notifyError } from "@/utils/toast";
import axios from "@/utils/axios";
import CompanyLogo from "../../company/ComapyLogo";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const JobGridItem = ({ item, style_2 = true }: { item: IJobType; style_2?: boolean }) => {
  const { id, company_logo, duration, location, display_salary, title, experience } = item || {};
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [isWishlisted, setIsWishlisted] = useState(item.is_wishlisted);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  const loginTriggerRef = useRef<HTMLAnchorElement | null>(null);

  const applyText1 = useLocalizedContent("Applied", "已申请");
  const applyText2 = useLocalizedContent("Apply", "立即申请");

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      loginTriggerRef.current?.click();
      return;
    }

    try {
      setWishlistLoading(true)
      if (isWishlisted) {
        await axios.delete(`/jobs/wishlist/${item.id}`);
        notifySuccess("Job removed from wishlist.");
      } else {
        await axios.post(`/jobs/wishlist/${item.id}`, {});
        notifySuccess("Job added to wishlist!");
      }

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      notifyError("Failed to update wishlist.");
    } finally {
      setWishlistLoading(false)
    }
  };

  return (
    <>
      <div className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}>
        {/* Logo */}
        <Link href={`/job-details-v1/${id}`} className="logo">
          {company_logo && <CompanyLogo companyLogo={company_logo} />}
        </Link>

        {/* 收藏按钮 */}
        <button
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          className={`save-btn text-center rounded-circle tran3s cursor-pointer ${isWishlisted  ? "active" : ""}`}
          title={`${isWishlisted  ? "Remove Job" : "Save Job"}`}
        >
          <i className="bi bi-bookmark-dash"></i>
        </button>

        {/* 工作类型 */}
        <div>
          <Link href={`/job-details-v1/${id}`} className={`job-duration fw-500 ${duration.toLowerCase().replace(" ", "-")}`}>
            {duration}
          </Link>
        </div>

        {/* 职位名称 */}
        <div>
          <Link href={`/job-details-v1/${id}`} className="title fw-500 tran3s">
            {title.length > 22 ? `${title.slice(0, 22)}..` : title}
          </Link>
        </div>

        {/* 薪资 + 经验要求 */}
        <div className="job-info d-flex flex-column justify-content-around">
          <div className="job-salary me-1">
            <span className="fw-500 text-dark">{display_salary || "Salary not specified"}</span>
          </div>
          <span className="fw-500 secondary mb-20">{experience || "Not specified"}</span>
        </div>

        {/* 位置 & 申请按钮 */}
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="job-location">
            <Link href={`/job-details-v1/${id}`}>{location}</Link>
          </div>
          <Link href={`/job-details-v1/${id}`} className="apply-btn text-center tran3s">
            {item.is_applied ? applyText1 : applyText2}
          </Link>
        </div>
      </div>

      <a ref={loginTriggerRef} href="#" className="d-none" data-bs-toggle="modal" data-bs-target="#loginModal"></a>

    </>
  );
};

export default JobGridItem;
