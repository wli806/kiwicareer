"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import WishlistButton from "../../wishlist/WishlistButton";
import CompanyLogo from "../../company/ComapyLogo";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const ListItemTwo = ({ item }: { item: IJobType }) => {
  const loginTriggerRef = useRef<HTMLAnchorElement | null>(null);

  const applyText1 = useLocalizedContent("Applied", "已申请");
  const applyText2 = useLocalizedContent("Apply", "立即申请");

  return (
    <>
      <div className="job-list-one style-two position-relative border-style mb-20">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-5">
            <div className="job-title d-flex align-items-center">
              <Link href={`/job-details-v1/${item.id}`} className="logo">
                <CompanyLogo companyLogo={item.company_logo} />
              </Link>
              <div className="split-box1">
                <Link href={`/job-details-v1/${item.id}`} className={`job-duration fw-500 ${item.duration.toLowerCase().replace(" ", "-")}`}>
                  {item.duration}
                </Link>
                <Link href={`/job-details-v1/${item.id}`} className="title fw-500 tran3s">
                  {item.title.slice(0, 22)} {item.title.length > 20 ? ".." : ""}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="job-location">
              <Link href={`/job-details-v1/${item.id}`}>{item.location}</Link>
            </div>
            <div className="job-salary">
              <span className="fw-500 secondary">{item.display_salary}</span> . {item.experience}
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
              {/* <button
                onClick={handleWishlistToggle}
                className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${isWishlisted  ? "active" : ""}`}
                title={`${isWishlisted  ? "Remove Job" : "Save Job"}`}
              >
                <i className={`bi ${isWishlisted ? "bi-bookmark-check-fill" : "bi-bookmark-dash"}`}></i>
              </button> */}
              <WishlistButton jobId={item.id} isInitiallyWishlisted={item.is_wishlisted} />
              <Link href={`/job-details-v1/${item.id}`} className="apply-btn text-center tran3s">
                {item.is_applied ? applyText1 : applyText2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <a ref={loginTriggerRef} href="#" className="d-none" data-bs-toggle="modal" data-bs-target="#loginModal"></a>

    </>
  );
};

export default ListItemTwo;
