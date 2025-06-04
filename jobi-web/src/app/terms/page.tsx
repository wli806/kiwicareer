import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import TermsMain from "../components/terms/termsMain";
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
          title="Terms and Conditions"
          subtitle="Understanding your rights and responsibilities."
          title_zh="条款与条件"
          subtitle_zh="了解您的权益和我们的承诺。"
        />
        {/*breadcrumb end */}

        {/* faq area start */}
        <TermsMain />
        {/* faq area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default TermsPage;
