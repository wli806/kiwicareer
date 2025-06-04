"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import JobDetailsV1Area from "@/app/job-details-v1/[id]/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import { IJobType } from "@/types/job-data-type";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface JobDetailsClientProps {
  jobId: string;
}

export default function JobDetailsClient({ jobId }: JobDetailsClientProps) {
  const [job, setJob] = useState<IJobType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const loadErrorText = useLocalizedContent("Failed to load job details.", "加载职位详情失败。");
  const jobNotFoundText = useLocalizedContent("Job not found", "未找到职位");
  const browseJobsText = useLocalizedContent("Browse Jobs", "浏览职位");
  const loadingJobText = useLocalizedContent("Loading job details...", "加载职位详情...");

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        notifyError(loadErrorText);
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, isAuthenticated]);

  if (!job && !loading) {
    return (
      <div className="text-center py-5">
        <h3 className="text-dark fw-bold">{jobNotFoundText}</h3>
        <button className="btn btn-primary mt-3" onClick={() => router.push("/jobs")}>
         {browseJobsText}
        </button>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumb />
        {/* job details breadcrumb end */}

        {loading ? (
          <div className="text-center py-5">
            <h3 className="text-dark fw-bold">{loadingJobText}</h3>
          </div>
        ) : (
          <>
            <JobDetailsV1Area job={job!} />
            <RelatedJobs category={[job!.category_name]} currentJobId={job!.id} />
          </>
        )}

        {/* job portal intro start */}
        <JobPortalIntro />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
}
