import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import RegisterArea from "../components/register/register-area";

const ModalCleanup = dynamic(() => import("@/layouts/common/ModalCleanup"), { ssr: false });

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {

  return (
    <Wrapper>
      <div className="main-page-wrapper">

        <ModalCleanup />

        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Register"
          subtitle="Create an account & Start your career journey"
          title_zh="注册"
          subtitle_zh="创建账户，开启您的职业生涯之旅"
        />

        {/*breadcrumb end */}

        {/* register area start */}
        <RegisterArea/>
        {/* register area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
