"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import ActionDropdown from "./action-dropdown";
import axios from "@/utils/axios";
import { notifyError, notifySuccess  } from "@/utils/toast";
import { IJobType } from "@/types/job-data-type";
import Pagination from "@/ui/pagination";
import { useRouter } from "next/navigation";
import CompanyLogo from "../../company/ComapyLogo";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AppliedJobArea = ({setIsOpenSidebar}:IProps) => {
  const [savedJobs, setSavedJobs] = useState<IJobType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("New");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 4;
  const router = useRouter();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/jobs/applied-jobs?page=${page}&limit=${itemsPerPage}&sort=${sort}`);
        setSavedJobs(response.data.applied_jobs);
        setTotalPages(response.data.total_pages);
        setTotalCount(response.data.total_count);

        if (response.data.applied_jobs.length === 0 && page > 1) {
          setPage(1);
        }

      } catch (error) {
        notifyError("Failed to fetch saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [sort, page]);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Applied Job</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <ShortSelect onChange={(val) => setSort(val)} />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <h3 className="text-dark fw-bold">Loading Applied Jobs...</h3>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="text-dark fw-bold">No applied jobs found</h3>
            <button 
              className="btn btn-three mt-50"
              onClick={() => router.push("/job-grid-v2")}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <>
            <div className="wrapper">
              {savedJobs.map((j) => (
                <div
                  key={j.id}
                  className="job-list-one style-two position-relative mb-20"
                >
                  <div className="row justify-content-between align-items-center">
                    <div className="col-xxl-3 col-lg-4">
                      <div className="job-title d-flex flex-column align-items-center">
                        <Link href={`/job-details-v1/${j.id}`} className="logo mb-2">
                          <CompanyLogo companyLogo={j.company_logo} />
                          {/* <Image src={j.company_logo} alt="company logo" width={100} height={60} layout="intrinsic"/> */}
                        </Link>
                        <Link 
                          href={`/job-details-v1/${j.id}`} 
                          className="title fw-500 tran3s text-center"
                          style={{ marginLeft: 0 }}
                        >
                          {j.title}
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                      <Link href={`/job-details-v1/${j.id}`} className="job-duration fw-500">
                        {j.duration}
                      </Link>
                      <div className="job-salary">
                        <span className="fw-500 text-dark">{j.display_salary}</span> . {j.experience}
                      </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                      <div className="job-location">
                        <Link href={`/job-details-v1/${j.id}`}>{j.location}</Link>
                      </div>
                      <div className="job-category">
                        <Link href={`/job-details-v1/${j.id}`}>{j.category_name}</Link>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                      <div className="action-dots float-end">
                        <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <span></span>
                        </button>
                        {/* Action Dropdown */}
                        <ActionDropdown jobId={j.id}/>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalCount > itemsPerPage && (
              <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                  Showing <span className="text-dark fw-500">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="text-dark fw-500">{Math.min(page * itemsPerPage, totalCount)}</span> of{" "}
                  <span className="text-dark fw-500">{totalCount}</span>
                </p>
                <Pagination pageCount={totalPages} handlePageClick={({ selected }) => setPage(selected + 1)} currentPage={page - 1} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppliedJobArea;
