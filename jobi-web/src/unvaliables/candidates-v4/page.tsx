import React from 'react';
import { Metadata } from 'next';
import Header from '@/layouts/headers/header';
import Wrapper from '@/layouts/wrapper';
import JobBreadcrumb from '../../app/components/jobs/breadcrumb/job-breadcrumb';
import CandidateV3Area from '../../app/components/candidate/candidate-v3-area';
import JobPortalIntro from '../../app/components/job-portal-intro/job-portal-intro';
import FooterOne from '@/layouts/footers/footer-one';

export const metadata: Metadata = {
  title: "Candidate v4",
};


const CandidateV4Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb title='Candidates' subtitle='Find you desire talents & make your work done' />
        {/* search breadcrumb end */}

        {/* candidate area start */}
        <CandidateV3Area style_2={true} />
        {/* candidate area end */}

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

export default CandidateV4Page;