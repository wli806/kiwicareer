import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import CompanyV3Area from "../components/company/company-v3-area";
import FooterOne from "@/layouts/footers/footer-one";

export const metadata: Metadata = {
  title: "Company v3",
};

const CompanyV3Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb 
          title="Company" 
          title_zh="合作企业"
          subtitle="Find your desire company and get your dream job" 
          subtitle_zh="寻找理想公司，开启梦想之旅"
        />
        {/*breadcrumb end */}

        {/* company v3 area start */}
        <CompanyV3Area />
        {/* company v3 area end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CompanyV3Page;
