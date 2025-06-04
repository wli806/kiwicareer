import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import CompanyBreadcrumb from "@/app/components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import CompanyDetailsArea from "@/app/components/company-details/company-details-area";
import OpenPosition from "@/app/components/company-details/open-position";

// 使用 fetch API 调用后端端点，获取公司详情数据
async function getCompanyDetails(companyId: string): Promise<any | null> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/jobs/company/${companyId}`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching company details:", error);
    return null;
  }
}

// 服务端生成 meta 信息
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const company = await getCompanyDetails(params.id);

  if (!company) {
    return {
      title: "Company Not Found - Company Portal",
      description: "The company you are looking for does not exist.",
      metadataBase: new URL(process.env.FRONT_END_URL || "http://localhost:3000"),
    };
  }

  // 如果 logo 不是完整的 URL，则前面拼接前端域名
  let logoUrl = company.logo;
  if (logoUrl && !logoUrl.startsWith("http")) {
    logoUrl = `${process.env.FRONT_END_URL}${logoUrl}`;
  }

  return {
    title: `${company.name} - Company Details`,
    description: company.description || "Find company details here.",
    keywords: [company.name, "company details", "KiwiCareer", "Kiwi", "job", company.website_url || ""],
    metadataBase: new URL(process.env.FRONT_END_URL || "http://localhost:3000"),
    openGraph: {
      title: `${company.name} - Company Details`,
      description: company.description || "Find company details here.",
      url: `${process.env.FRONT_END_URL}/company-details/${params.id}`,
      siteName: "KiwiCareer",
      images: [
        {
          url: logoUrl,
          alt: `${company.name} logo`,
        },
      ],
      type: "website",
    },
  };
}

export default async function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const company = await getCompanyDetails(params.id);

  if (!company) {
    notFound();
  }

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* Header */}
        <Header />
        {/* Breadcrumb */}
        <CompanyBreadcrumb 
          title="Company Details" 
          title_zh="企业详情"
          subtitle="Find company details here" 
          subtitle_zh="了解企业概况以及开放岗位"
        />
        {/* 公司详情展示区域 */}
        <CompanyDetailsArea companyId={params.id} />
        {/* 可选：展示该公司的招聘职位 */}
        <OpenPosition companyId={params.id}/>
        {/* Footer */}
        <FooterOne />
      </div>
    </Wrapper>
  );
}
