"use client";
import React, { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import CompanyReviews from "./company-reviews";
// import VideoPopup from "../common/video-popup";
import GenericShareButton from "@/app/components/common/GenericShareButton";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface ICompanyDetails {
  id: number;
  name: string;
  logo: string;
  website_url: string;
  description: string;
  location: string;
  size: string;
  email: string;
  founded: string;
  phone: string;
  category: string;
}

interface CompanyDetailsAreaProps {
  companyId: string;
}

const CompanyDetailsArea: React.FC<CompanyDetailsAreaProps> = ({ companyId }) => {
  const [company, setCompany] = useState<ICompanyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const router = useRouter();

  const loadingText = useLocalizedContent("Loading company details...", "正在加载公司详情...");
  const notFoundText = useLocalizedContent("Company not found", "未找到公司");
  const browseCompaniesText = useLocalizedContent("Browse Companies", "浏览公司");
  const visitWebsiteText = useLocalizedContent("Visit our website", "访问我们的网站");
  const overviewText = useLocalizedContent("Overview", "企业概述");
  const shareLabel = useLocalizedContent("Share:", "分享：");


  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/jobs/company/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        notifyError("Failed to load company details.");
        router.push("/companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId, router]);

  if (loading) {
    return (
      <section className="company-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container text-center py-5">
          <h3 className="text-dark fw-bold">{loadingText}</h3>
        </div>
      </section>
    );
  }

  if (!company) {
    return (
      <section className="company-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container text-center py-5">
          <h3 className="text-dark fw-bold">{notFoundText}</h3>
          <button className="btn btn-primary mt-3" onClick={() => router.push("/companies")}>
            {browseCompaniesText}
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="company-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            {/* Sidebar: Company Info */}
            <div className="col-xxl-3 col-xl-4 order-xl-last">
              <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="lazy-img m-auto logo"
                />
                <div className="text-md text-dark text-center mt-15 mb-20 lg-mb-10">
                  {company.name}
                </div>
                {company.website_url && (
                  <div className="text-center">
                    <a
                      href={company.website_url}
                      className="website-btn-two tran3s"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {visitWebsiteText}
                    </a>
                  </div>
                )}

                {/* <div className="border-top mt-35 lg-mt-20 pt-25">
                  <ul className="job-meta-data row style-none">
                    <li className="col-12">
                      <span>Location: </span>
                      <div>{company.location}</div>
                    </li>
                    <li className="col-12">
                      <span>Size:</span>
                      <div>{company.size}</div>
                    </li>
                    <li className="col-12">
                      <span>Email: </span>
                      <div>
                        <a href={`mailto:${company.email}`}>{company.email}</a>
                      </div>
                    </li>
                    <li className="col-12">
                      <span>Founded: </span>
                      <div>{company.founded}</div>
                    </li>
                    <li className="col-12">
                      <span>Phone:</span>
                      <div>{company.phone}</div>
                    </li>
                    <li className="col-12">
                      <span>Category: </span>
                      <div>{company.category}</div>
                    </li>
                  </ul>

                  <a
                    href={`mailto:${company.email}`}
                    className="btn-ten fw-500 text-white w-100 text-center tran3s mt-25"
                  >
                    Send Message
                  </a>
                </div> */}
              </div>
            </div>
            {/* Main Content: Overview, Intro, Reviews, etc. */}
            <div className="col-xxl-9 col-xl-8 order-xl-first">
              <div className="details-post-data me-xxl-5 pe-xxl-4">
                <h3>{overviewText}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: company.description.replace(/(\\n|\n)/g, "<br/>")
                  }}
                />
                {/* <h3>Intro</h3>
                <div className="video-post d-flex align-items-center justify-content-center mb-50">
                  <a
                    className="fancybox rounded-circle video-icon tran3s text-center"
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-play-fill"></i>
                  </a>
                </div>
                <div className="position-relative">
                  <h3>Company Reviews</h3>
                  <CompanyReviews />
                </div> */}
                <div className="share-option mt-60">
                  <ul className="style-none d-flex align-items-center">
                    <li className="fw-500 me-2">{shareLabel}</li>
                    <li>
                      <a
                        href={currentUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(company.name)}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentUrl ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(company.name)}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <GenericShareButton />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video Modal */}
      {/* <VideoPopup isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={"-6ZbrfSRWKc"} /> */}
    </>
  );
};

export default CompanyDetailsArea;
