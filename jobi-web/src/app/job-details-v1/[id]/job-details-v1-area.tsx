"use client";
import React, { useState, useRef  } from 'react';
import { IJobType } from '@/types/job-data-type';
import Image from 'next/image';
import axios from "@/utils/axios";
import { notifySuccess, notifyError } from "@/utils/toast";
import { useAppSelector } from "@/redux/hook";
import WishlistButton from '../../components/wishlist/WishlistButton';
import CompanyLogo from '../../components/company/ComapyLogo';
import GenericShareButton from '../../components/common/GenericShareButton';
import ResumeSelectorPopup from '@/app/components/common/popup/ResumeSelectorPopup';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

const JobDetailsV1Area = ({job}:{job:IJobType}) => {

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isApplied, setIsApplied] = useState(job.is_applied);
  const [loading, setLoading] = useState(false);
  const loginTriggerRef = useRef<HTMLAnchorElement | null>(null);

  const [showResumeSelector, setShowResumeSelector] = useState(false);


  const loginApplyError = useLocalizedContent(
    "You need to log in to apply for this job.",
    "您需要登录后才能申请该职位。"
  );
  const applySuccess = useLocalizedContent(
    "You have successfully applied for this job!",
    "您已成功申请此职位！"
  );
  const applyFail = useLocalizedContent(
    "Failed to apply for the job.",
    "申请职位失败。"
  );
  const shareText = useLocalizedContent(
    "Share this job with your network:",
    "与您的社交网络分享此职位:"
  );
  const alreadyAppliedText = useLocalizedContent("Already Applied", "已申请");
  const applyingText = useLocalizedContent("Applying...", "申请中...");
  const applyNowText = useLocalizedContent("Apply Now", "立即申请");

  const salaryLabel = useLocalizedContent("Salary", "薪资");
  const expertiseLabel = useLocalizedContent("Expertise", "专业");
  const locationLabel = useLocalizedContent("Location", "地点");
  const jobTypeLabel = useLocalizedContent("Job Type", "职位类型");
  const dateLabel = useLocalizedContent("Date", "日期");
  const experienceLabel = useLocalizedContent("Experience", "经验");

  const handleApply = async () => {
    if (!isAuthenticated) {
      notifyError(loginApplyError);
      loginTriggerRef.current?.click();
      return;
    }
    // 已登录时弹出简历选择 Popup
    setShowResumeSelector(true);
  };

  const handleResumeSelect = async (cv_url: string) => {
    setLoading(true);
    try {
      await axios.post(`/jobs/apply/${job.id}`, { cv_url });
      setIsApplied(true);
      notifySuccess(applySuccess);
    } catch (error) {
      notifyError(applyFail);
    } finally {
      setLoading(false);
      setShowResumeSelector(false);
    }
  };

//   const handleApply = async () => {
//     if (!isAuthenticated) {
//       notifyError("You need to log in to apply for this job.");
// 	  loginTriggerRef.current?.click();
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(`/jobs/apply/${job.id}`);
//       setIsApplied(true);
//       notifySuccess("You have successfully applied for this job!");
//     } catch (error) {
//       notifyError("Failed to apply for the job.");
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
	<>
    	<section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
			<div className="container">
				<div className="row">
					<div className="col-xxl-9 col-xl-8">
						<div className="details-post-data me-xxl-5 pe-xxl-4">
							<div className="post-date">{formatDate(job.date)} by{" "}
								<span className="fw-500 text-dark">{job.company_name}</span>
							</div>
							<div className="btn-group d-flex align-items-center justify-content-sm-start xs-mt-20">
								<h3 className="post-title mb-0">{job.title}</h3>
								<div className="ms-3 mt-10">
									<WishlistButton jobId={job.id} isInitiallyWishlisted={job.is_wishlisted} />
								</div>
							</div>

							{/* <ul className="share-buttons d-flex flex-wrap style-none">
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-facebook"></i>
									<span>Facebook</span>
								</a></li>
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-twitter"></i>
									<span>Twitter</span>
								</a></li>
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-link-45deg"></i>
									<span>Copy</span>
								</a></li>
							</ul> */}

							<div className="post-block border-style mt-30">
								<div className="d-flex align-items-center">
									{/* <div className="block-numb text-center fw-500 text-white rounded-circle me-2">2</div>
										<h4 className="block-title">Job Description</h4> */}
									<div className="job-description-content" dangerouslySetInnerHTML={{ __html: job.details || "" }}></div>
								</div>

								<div className="share-option mt-20">
									<div className="mb-2 text-muted" style={{ fontSize: "14px" }}>
										{shareText}<span><GenericShareButton /></span>
									</div>
								</div>
							</div>

							{/* <div className="post-block border-style mt-50 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">1</div>
									<h4 className="block-title">Overview</h4>
								</div>
								<p>{job.overview}</p>
							</div>
							<div className="post-block border-style mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">2</div>
									<h4 className="block-title">Job Description</h4>
								</div>
								<p>As a <a href="#">Product Designer</a> at WillowTree, you’ll give form to ideas by being the voice and owner of product decisions. You’ll drive the design direction, and then make it happen!</p>
								<p>We understand our responsibility to create a diverse, equitable, and inclusive place within the tech industry, while pushing to make our industry more representative. </p>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">3</div>
									<h4 className="block-title">Responsibilities</h4>
								</div>
								<ul className="list-type-one style-none mb-15">
									<li>Collaborate daily with a multidisciplinary team of Software Engineers, Researchers, Strategists, and Project Managers.</li>
									<li>Co-lead ideation sessions, workshops, demos, and presentations with clients on-site</li>
									<li>Push for and create inclusive, accessible design for all</li>
									<li>Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.</li>
									<li>Sketch, wireframe, build IA, motion design, and run usability tests</li>
									<li>Design pixel perfect responsive UI’s and understand that adopting common interface pattern is better for UX than reinventing the wheel</li>
									<li>Ensure content strategy and design are perfectly in-sync</li>
									<li>Give and receive design critique to help constantly refine and push our work</li>
								</ul>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">4</div>
									<h4 className="block-title">Required Skills:</h4>
								</div>
								<ul className="list-type-two style-none mb-15">
									<li>You’ve been designing digital products for 2+ years.</li>
									<li>A portfolio that exemplifies strong visual design and a focus on defining the user experience.</li>
									<li>You’ve proudly shipped and launched several products.</li>
									<li>You have some past experience working in an agile environment – Think two-week sprints.</li>
									<li>Experience effectively presenting and communicating your design decisions to clients and team members</li>
									<li>Up-to-date knowledge of design software like Figma, Sketch etc.</li>
								</ul>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">5</div>
									<h4 className="block-title">Benefits:</h4>
								</div>
								<ul className="list-type-two style-none mb-15">
									<li>We are a remote-first company.</li>
									<li>100% company-paid health insurance premiums for you & your dependents</li>
									<li>Vacation stipend</li>
									<li>Unlimited paid vacation and paid company holidays</li>
									<li>Monthly wellness/gym stipend</li>
								</ul>
							</div> */}
						</div>
					</div>

					<div className="col-xxl-3 col-xl-4">
						<div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
							{/* <Image src={job.company_logo} alt="logo" className="lazy-img m-auto logo" width={60} height={60}/> */}
							{job.company_logo && <CompanyLogo companyLogo={job.company_logo} />}
							<div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">{job.company_name}</div>
							{/* <a href="#" className="website-btn tran3s">Visit website</a> */}

							<div className="border-top mt-40 pt-40">
								<ul className="job-meta-data row style-none">
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>{salaryLabel}</span>
										<div>{job.display_salary}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>{expertiseLabel}</span>
										<div>{job.experience}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>{locationLabel}</span>
										<div>{job.location}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>{jobTypeLabel}</span>
										<div>{job.duration}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>{dateLabel}</span>
										<div>{formatDate(job.date)}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>{experienceLabel}</span>
										<div>{job.experience}</div>
									</li>
								</ul>
								<button
									className={`btn-one w-100 mt-25 ${isApplied ? "disabled" : ""}`}
									onClick={handleApply}
									disabled={isApplied || loading}
									>
										{isApplied
										? alreadyAppliedText
										: loading
										? applyingText
										: applyNowText}
								</button>
								<a ref={loginTriggerRef} href="#" className="d-none" data-bs-toggle="modal" data-bs-target="#loginModal"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		{showResumeSelector && (
        <ResumeSelectorPopup
          open={showResumeSelector}
          onClose={() => setShowResumeSelector(false)}
          onSelect={handleResumeSelect}
        />
      )}
	</>
  );
};

export default JobDetailsV1Area;