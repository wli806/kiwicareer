"use client";
import React from "react";
import Link from "next/link";
import CompanyLogo from "./ComapyLogo";

interface ICompany {
  id: number;
  job_count: number;
  logo: string;
  name: string;
}

const CompanyListItem = ({ item }: { item: ICompany }) => {
  return (
    <div className="company-list-layout mb-20 p-3 border rounded">
      {/* 适用于 md 及以上屏幕 */}
      <div className="row align-items-center d-none d-md-flex">
        {/* Logo 固定宽度区域 */}
        <div className="col-auto logo-col">
          <Link href={`/company-details/${item.id}`}>
            <CompanyLogo companyLogo={item.logo} />
          </Link>
        </div>
        {/* 公司名称区域，文本溢出用省略号处理 */}
        <div className="col">
          <h5 className="m-0 company-name-ellipsis">
            <Link href={`/company-details/${item.id}`} className="tran3s">
              {item.name}
            </Link>
          </h5>
        </div>
        {/* 职位数量 */}
        <div className="col-auto">
          <Link
            href={`/company-details/${item.id}`}
            className="open-job-btn text-center fw-500 tran3s"
          >
            {item.job_count} open job
          </Link>
        </div>
      </div>
      {/* 适用于 xs 屏幕：logo、名称、职位数量各占一行 */}
      <div className="d-flex d-md-none flex-column text-center">
        <div className="mb-2">
          <Link href={`/company-details/${item.id}`}>
            <CompanyLogo companyLogo={item.logo} />
          </Link>
        </div>
        <div className="mb-2 company-name-ellipsis">
          <h5 className="m-0">
            <Link href={`/company-details/${item.id}`} className="tran3s">
              {item.name}
            </Link>
          </h5>
        </div>
        <div>
          <Link
            href={`/company-details/${item.id}`}
            className="open-job-btn text-center fw-500 tran3s"
          >
            {item.job_count} open job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyListItem;
