import React from 'react';
import { Metadata } from 'next';
import Header from '@/layouts/headers/header';
import Wrapper from '@/layouts/wrapper';
import JobBreadcrumb from '../../app/components/jobs/breadcrumb/job-breadcrumb';
import JobListThree from '../../app/components/jobs/list/job-list-three';
import JobPortalIntro from '../../app/components/job-portal-intro/job-portal-intro';
import FooterOne from '@/layouts/footers/footer-one';

export const metadata: Metadata = {
  title: "Job List v1",
};


const JobListOnePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb />
        {/* search breadcrumb end */}

        {/* job list three start */}
        <JobListThree itemsPerPage={8} />
        {/* job list three end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobListOnePage;