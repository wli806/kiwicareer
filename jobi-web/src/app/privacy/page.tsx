import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import PrivacyMain from "../components/privacy/PrivacyMain";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

const TermsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Privacy Policy"
          subtitle="Protecting Your Personal Data & Your Rights"
          title_zh="隐私政策"
          subtitle_zh="保护您的个人数据及您的权益"
        />

        {/*breadcrumb end */}

        {/* faq area start */}
        <PrivacyMain />
        {/* faq area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default TermsPage;
