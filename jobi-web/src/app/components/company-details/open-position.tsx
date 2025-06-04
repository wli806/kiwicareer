"use client";
import React, { useState, useEffect } from "react";
import axios from "@/utils/axios";
import ListItemTwo from "../jobs/list/list-item-2";
import Pagination from "@/ui/pagination";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { IJobType } from "@/types/job-data-type";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface OpenPositionProps {
  companyId: string;
}

const OpenPosition: React.FC<OpenPositionProps> = ({ companyId }) => {
  // 用于保存职位列表、总记录数以及加载状态
  const [jobs, setJobs] = useState<IJobType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // react-paginate 使用 0-based 页码，这里 currentPage 初始值设为 0
  const [currentPage, setCurrentPage] = useState<number>(0);
  const router = useRouter();
  const limit = 4; // 每页显示 4 个职位

  const openPositionTitle = useLocalizedContent("Open Position", "开放职位");
  const exploreMoreText = useLocalizedContent("Explore More", "查看更多");
  const loadingText = useLocalizedContent("Loading...", "加载中...");
  const noPositionsText = useLocalizedContent("No open positions available.", "暂无开放职位");

  // 请求后端获取指定公司职位数据
  const fetchJobs = async (page: number) => {
    setLoading(true);
    try {
      // 注意：后端端点假设使用 1-based 分页
      const response = await axios.get(`/jobs/company/${companyId}/jobs`, {
        params: {
          page: page + 1,
          limit,
          // 可根据需要添加 sort 参数等
        },
      });
      setJobs(response.data.jobs);
      setTotalCount(response.data.total_count);
      setCurrentPage(page);
    } catch (error) {
      notifyError("Failed to load open positions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 每当 companyId 变化时，从第一页开始获取数据
    fetchJobs(0);
  }, [companyId]);

  const handlePageChange = (event: { selected: number }) => {
    fetchJobs(event.selected);
  };

  return (
    <section className="company-open-position pt-80 lg-pt-60 pb-100 lg-pb-60">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-two">
              <h2>{openPositionTitle}</h2>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end">
              <a href={"/job-grid-v2"} className="btn-six">
               {exploreMoreText}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-50">
          {loading ? (
            <p>{loadingText}</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <ListItemTwo key={job.id} item={job} />
            ))
          ) : (
            <p>{noPositionsText}</p>
          )}
        </div>
        {totalCount > limit && (
          <div className="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
            <Pagination
              pageCount={Math.ceil(totalCount / limit)}
              currentPage={currentPage}
              handlePageClick={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenPosition;
