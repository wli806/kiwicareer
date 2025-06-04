"use client"
import React from "react";
import Link from "next/link";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const JobPortalIntro = ({top_border=false}:{top_border?:boolean}) => {

  const headerTitle = useLocalizedContent(
    "Most complete job portal.",
    "最全面的求职门户"
  );
  const description = useLocalizedContent(
    "Signup and start find your dream job.",
    "注册并开始寻找你的理想工作。"
  );
  const btnJob = useLocalizedContent(
    "Looking for job?",
    "找工作？"
  );
  const btnCompany = useLocalizedContent(
    "Browse Companies",
    "浏览公司"
  );


  return (
    <section className="job-portal-intro">
      <div className="container">
        <div className={`wrapper bottom-border ${top_border?'top-border':''} pt-100 lg-pt-80 md-pt-50 pb-65 md-pb-50`}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="text-center text-lg-start wow fadeInUp" data-wow-delay="0.3s">
                <h2>{headerTitle}</h2>
                <p className="text-md m0 md-pb-20">
                 {description}
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <ul className="btn-group style-none d-flex flex-wrap justify-content-center justify-content-lg-end">
                <li className="me-2">
                  <Link href="/job-grid-v2" className="btn-three">
                   {btnJob}
                  </Link>
                </li>
                <li className="ms-2">
                  <Link href="/company-v3" className="btn-four">
                   {btnCompany}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPortalIntro;
