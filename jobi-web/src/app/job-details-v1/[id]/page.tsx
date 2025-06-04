import React from "react";
import { Metadata } from "next";
import axios from "@/utils/axios";
import { notFound } from "next/navigation";
import JobDetailsClient from "./JobDetailsClient";
import { IJobType } from "@/types/job-data-type";

async function getJobDetails(jobId: string): Promise<IJobType | null> {
  try {
    const response = await axios.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await getJobDetails(params.id);

  if (!job) {
    return {
      title: "Job Not Found - KiwiCareer",
      description: "The job you are looking for does not exist.",
      metadataBase: new URL(process.env.FRONT_END_URL || "http://localhost:3000"),
    };
  }

  let companyLogo = job.company_logo;
  if (companyLogo && !companyLogo.startsWith("http")) {
    companyLogo = `${process.env.FRONT_END_URL}${companyLogo}`;
  }

  return {
    title: `${job.title} at ${job.company_name} - KiwiCareer`,
    description: job.overview || "Find more job details here.",
    keywords: [`${job.title}`, `${job.company_name}`, "job listing", "career", "kiwi career", "kiwi", "job", job.category_name],
    openGraph: {
      title: `${job.title} at ${job.company_name} - KiwiCareer`,
      description: job.overview || "Find more job details here.",
      url: `${process.env.FRONT_END_URL}/job-details-v1/${params.id}`,
      siteName: "KiwiCareer",
      images: [
        {
          url: companyLogo,
          width: 1200,
          height: 630,
          alt: `${job.company_name} logo`,
        },
      ],
      type: "website",
    },
  };
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJobDetails(params.id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClient jobId={params.id} />;
}
