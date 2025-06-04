"use client";
import React from "react";
import Image from "next/image";
import last_icon from "@/assets/images/icon/icon_50.svg";

interface CompanyPaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const CompanyPagination: React.FC<CompanyPaginationProps> = ({ currentPage, totalCount, limit, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / limit);

  let pagesToDisplay: (number | string)[] = [];
  if (totalPages <= 4) {

    pagesToDisplay = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {

    pagesToDisplay = [1, 2, 3, 4, 'ellipsis', totalPages];
  }

  return (
    <ul className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none">
      {pagesToDisplay.map((page, index) => {
        if (page === 'ellipsis') {
          return <li key={index}>....</li>;
        } else {
          return (
            <li key={page} className={page === currentPage ? "active" : ""}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
              >
                {page}
              </a>
            </li>
          );
        }
      })}

      {totalPages > 4 && (
        <li className="ms-2">
          <a
            href="#"
            className="d-flex align-items-center"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
          >
            Last
            <Image src={last_icon} alt="last_icon" className="ms-2" />
          </a>
        </li>
      )}
    </ul>
  );
};

export default CompanyPagination;
