"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CompanyListItem from "./company-list-item";
import NewNiceSelect from "@/ui/new-select";
import CompanyFilterModal from "../common/popup/company-filter-modal";
import Pagination from "@/ui/pagination";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const CompanyV3Area = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 从 URL 中读取参数，若不存在则使用默认值
  const pageParam = searchParams.get("page");
  const sortParam = searchParams.get("sort") || "job_count";
  const searchParam = searchParams.get("search") || "";
  const hasJobsParam = searchParams.get("has_jobs") || "true";

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const sort = sortParam;
  const search = searchParam;
  const limit = 20;
  // 以 URL 参数为初始值，转换为 boolean
  const [onlyWithJobs, setOnlyWithJobs] = useState<boolean>(
    (hasJobsParam || "true").toLowerCase() === "true"
  );

  // 数据状态
  const [companies, setCompanies] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // 当 URL 参数变化时，同步更新 onlyWithJobs 状态
  useEffect(() => {
    const hasJobs = (searchParams.get("has_jobs") || "true").toLowerCase() === "true";
    setOnlyWithJobs(hasJobs);
  }, [searchParams]);

  // 请求后端接口，获取公司数据
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.append("page", currentPage.toString());
      query.append("limit", limit.toString());
      query.append("sort", sort);
      query.append("has_jobs", onlyWithJobs ? "true" : "false");
      if (search) {
        query.append("search", search);
      }
      const res = await fetch(
        `${process.env.API_BASE_URL}/jobs/companies?${query.toString()}`
      );
      const data = await res.json();
      setCompanies(data.companies);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortText = useLocalizedContent('Sort:', '排序方式:');

  // 当 URL 参数变化时重新获取数据
  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 排序选择回调：更新 URL 中的 sort 参数，并重置页码为 1
  const handleSortChange = (value: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("sort", value);
    updatedParams.set("page", "1");
    router.push(`/company-v3?${updatedParams.toString()}`);
  };

  // 分页点击回调：更新 URL 中的 page 参数
  const handlePageChange = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", newPage.toString());
    router.push(`/company-v3?${updatedParams.toString()}`);
  };

  // 单选框变化回调：更新 URL 中的 has_jobs 参数，并重置页码为 1
  const handleHasJobsChange = (value: boolean) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("has_jobs", value ? "true" : "false");
    updatedParams.set("page", "1");
    router.push(`/company-v3?${updatedParams.toString()}`);
  };

  // 搜索处理：更新 URL 中的 search 参数，并重置页码为 1
  const handleSearch = (value: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("search", value);
    updatedParams.set("page", "1");
    router.push(`/company-v3?${updatedParams.toString()}`);
  };

  return (
    <>
      <section className="company-profiles bg-color pt-90 lg-pt-70 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wrapper">

                <div className="upper-filter mb-25">
                  {/* 第一行：搜索框 */}
                  <div className="row">
                    <div className="col-12">
                      <div className="search-box flex-grow-1 me-3 position-relative">
                        <input
                          type="text"
                          className="form-control border-0 shadow-sm"
                          placeholder="Search companies..."
                          defaultValue={search}
                          style={{ height: "50px", fontSize: "1rem" }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSearch((e.target as HTMLInputElement).value);
                            }
                          }}
                        />
                        <span
                          className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const input = document.querySelector(".search-box input") as HTMLInputElement;
                            if (input) {
                              handleSearch(input.value);
                            }
                          }}
                        >
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 第二行：公司数量和排序、单选 */}
                  <div className="row align-items-center mt-3">
                    <div className="col-6">
                      <div className="total-job-found">
                        All <span className="text-dark fw-500">{totalCount}</span> company found
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="short-filter d-flex align-items-center">
                          <div className="text-dark fw-500 me-2 hide-below-450">{sortText}</div>
                          <NewNiceSelect
                            value={sort}
                            options={[
                              { value: "job_count", label: "Most Jobs" },
                              { value: "company_name", label: "Company Name" },
                            ]}
                            placeholder="Select an option"
                            name="Sort by"
                            onChange={(item) => handleSortChange(item.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* 列表展示区域 */}
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="accordion-box list-style show">
                    <div className="row">
                      {companies.map((item) => (
                        <div key={item.id} className="col-12 col-md-6">
                          <CompanyListItem item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 分页组件 */}
                <div className="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing{" "}
                    <span className="text-dark fw-500">
                      {(currentPage - 1) * limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="text-dark fw-500">
                      {Math.min(currentPage * limit, totalCount)}
                    </span>{" "}
                    of <span className="text-dark fw-500">{totalCount}</span>
                  </p>
                  <Pagination
                    pageCount={Math.ceil(totalCount / limit)}
                    currentPage={currentPage - 1} // react-paginate 使用 0-based 页码
                    handlePageClick={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 筛选弹窗 */}
      <CompanyFilterModal />
    </>
  );
};

export default CompanyV3Area;




// "use client";
// import React, { useState } from "react";
// import CompanyPagination from "./company-pagination";
// import company_data from "@/data/company-data";
// import CompanyGridItem from "./company-grid-item";
// import CompanyListItem from "./company-list-item";
// import ShortSelect from "../common/short-select";
// import CompanyFilterModal from "../common/popup/company-filter-modal";

// const CompanyV3Area = ({ style_2 = false }: { style_2?: boolean }) => {
//   const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");
//   return (
//     <>
//       <section className="company-profiles bg-color pt-90 lg-pt-70 pb-160 xl-pb-150 lg-pb-80">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="wrapper">
//                 <div className="upper-filter d-flex justify-content-between align-items-start align-items-md-center mb-25">
//                   <div className="d-md-flex align-items-center">
//                     <button
//                       type="button"
//                       className="filter-btn fw-500 tran3s me-3"
//                       data-bs-toggle="modal"
//                       data-bs-target="#filterPopUp"
//                     >
//                       <i className="bi bi-funnel"></i>
//                       Filter
//                     </button>
//                     <div className="total-job-found md-mt-10">
//                       All <span className="text-dark fw-500">320</span> company
//                       found
//                     </div>
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <div className="short-filter d-flex align-items-center">
//                       <div className="text-dark fw-500 me-2">Short:</div>
//                       <ShortSelect />
//                     </div>
//                     <button
//                       onClick={() => setJobType("list")}
//                       className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${
//                         jobType === "grid" ? "active" : ""
//                       }`}
//                       title="Active List"
//                     >
//                       <i className="bi bi-list"></i>
//                     </button>
//                     <button
//                       onClick={() => setJobType("grid")}
//                       className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${
//                         jobType === "list" ? "active" : ""
//                       }`}
//                       title="Active Grid"
//                     >
//                       <i className="bi bi-grid"></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div
//                   className={`accordion-box grid-style ${
//                     jobType === "grid" ? "show" : ""
//                   }`}
//                 >
//                   <div className="row">
//                     {company_data.map((item) => (
//                       <div
//                         key={item.id}
//                         className="col-xl-3 col-lg-4 col-sm-6 d-flex"
//                       >
//                         <CompanyGridItem item={item} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div
//                   className={`accordion-box list-style ${
//                     jobType === "list" ? "show" : ""
//                   }`}
//                 >
//                   {company_data.map((item) => (
//                     <CompanyListItem key={item.id} item={item} />
//                   ))}
//                 </div>

//                 <div className="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
//                   <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
//                     Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
//                     <span className="text-dark fw-500">320</span>
//                   </p>
//                   <CompanyPagination />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* filter modal start */}
//       <CompanyFilterModal />
//       {/* filter modal end */}
//     </>
//   );
// };

// export default CompanyV3Area;
