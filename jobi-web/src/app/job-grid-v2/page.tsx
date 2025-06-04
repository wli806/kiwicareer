"use client";
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import FooterOne from "@/layouts/footers/footer-one";
import JobBreadcrumb from "../components/jobs/breadcrumb/job-breadcrumb";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import JobListV2Area from "../components/jobs/list/job-list-v2-area";
import axios from "@/utils/axios";
import { useAppSelector } from "@/redux/hook";

export const metadata: Metadata = {
  title: "Job Grid v2",
};

export default function JobGridTwoPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { token } = useAppSelector((state) => state.auth);
  const { grid_type } = useAppSelector((state) => state.filter)
  const [data, setData] = useState({ jobs: [], total_count: 0 });
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      setIsReady(true);
    }
  }, [token]);

  useEffect(() => {
    if (!isReady) return;

    let isMounted = true;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams).toString();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        console.log("Fetching jobs with headers:", headers);

        const response = await axios.get(`/jobs/search?${params}`, { headers });
        
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        if (isMounted) {
          setData({ jobs: [], total_count: 0 });
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [searchParams, isReady]);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* Header */}
        <Header />

        {/* Breadcrumb */}
        <JobBreadcrumb />

        {/* Job List (SSR) */}
        {loading ? (
          <div className="text-center py-5">
            <h3 className="text-dark fw-bold">Loading Jobs...</h3>
          </div>
        ) : (
          <JobListV2Area itemsPerPage={8} grid_style={grid_type} jobsData={data.jobs} totalCount={data.total_count} />
        )}

        {/* Job Portal Intro */}
        <JobPortalIntro top_border={true} />

        {/* Footer */}
        <FooterOne />
      </div>
    </Wrapper>
  );
}
