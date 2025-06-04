"use client";
import React, { useEffect, useState, useRef  } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import JobGridItem from "./grid/job-grid-item";
import axios from "@/utils/axios";
import { IJobType } from "@/types/job-data-type";
import { notifyError } from "@/utils/toast";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface RelatedJobsProps {
  category: string[];
  currentJobId?: number;
}

const RelatedJobs = ({ category, currentJobId }: RelatedJobsProps) => {
  const [relatedJobs, setRelatedJobs] = useState<IJobType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);

  const titleText = useLocalizedContent("Related Jobs", "相关职位");
  const loadingText = useLocalizedContent("Loading related jobs...", "加载相关职位中...");
  const noJobsText = useLocalizedContent("No related jobs found.", "未找到相关职位。");

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/jobs/related`, {
          params: { category, limit: 8, current_job_id: currentJobId },
        });
        setRelatedJobs(response.data.related_jobs);
      } catch (error) {
        notifyError("Failed to fetch related jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedJobs();
  }, [category]);

  useEffect(() => {
    if (jobRefs.current.length > 0) {
      const heights = jobRefs.current.map((ref) => ref?.clientHeight || 0);
      const maxHeight = Math.max(...heights);
      jobRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.height = `${maxHeight}px`;
        }
      });
    }
  }, [relatedJobs]);


  return (
    <section className="related-job-section pt-90 lg-pt-70 pb-120 lg-pb-70">
      <div className="container">
        <div className="position-relative">
          <div className="title-three text-center text-md-start mb-55 lg-mb-40">
            <h2 className="main-font">{titleText}</h2>
          </div>

          {loading ? (
            <div className="text-center">
              <h4 className="text-muted">{loadingText}</h4>
            </div>
          ) : relatedJobs.length === 0 ? (
            <div className="text-center">
              <h4 className="text-muted">{noJobsText}</h4>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={relatedJobs.length === 1 ? 1 : 4}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation
              centeredSlides={relatedJobs.length === 1}
              breakpoints={{
                // 1440: { slidesPerView: relatedJobs.length < 5 ? relatedJobs.length : 5 },
                1200: { slidesPerView: relatedJobs.length < 4 ? relatedJobs.length : 4 }, 
                992: { slidesPerView: relatedJobs.length < 3 ? relatedJobs.length : 3 },
                600: { slidesPerView: relatedJobs.length < 2 ? relatedJobs.length : 2 },
                300: { slidesPerView: 1 },
              }}
              className="related-job-slider"
            >
              {relatedJobs.map((j, index) => (
                <SwiperSlide key={j.id}>
                  <div ref={(el) => (jobRefs.current[index] = el)}>
                    <JobGridItem item={j} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedJobs;
