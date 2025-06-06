"use client";
import React, { useEffect, useState } from "react";
import ListItemTwo from "./list-item-2";
import JobGridItem from "../grid/job-grid-item";
import Pagination from "@/ui/pagination";
import NewNiceSelect from "@/ui/new-select";
import FilterAreaTwo from "../filter/job-filter-2/filter-area-2";
import { useSearchParams, useRouter } from "next/navigation";
import { IJobType } from "@/types/job-data-type";
import { setGridType } from "@/redux/features/filterSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

interface JobListProps {
  itemsPerPage: number;
  grid_style?: boolean;
  jobsData: IJobType[];
  totalCount: number;
}

const JobListV2Area: React.FC<JobListProps> = ({ itemsPerPage, jobsData, totalCount }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const gridType = useAppSelector((state) => state.filter.grid_type);

  const [currentItems, setCurrentItems] = useState<IJobType[]>(jobsData || []);
  const [pageCount, setPageCount] = useState(Math.ceil(totalCount / itemsPerPage));
  const [itemOffset, setItemOffset] = useState(0);
  const [shortValue, setShortValue] = useState("");

  const pageParam = searchParams.get("page");
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState<number>(pageNumber - 1);


  const totalJobsText = useLocalizedContent("All", "全部");
  const jobsFoundText = useLocalizedContent("jobs found", "个职位已找到");
  const sortLabel = useLocalizedContent("Sort:", "排序:");
  const defaultOption = useLocalizedContent("Default", "默认");
  const lowToHigh = useLocalizedContent("Low to High Salary", "薪资从低到高");
  const highToLow = useLocalizedContent("High to Low Salary", "薪资从高到低");
  const noJobsText = useLocalizedContent("No jobs found", "未找到职位");
  const adjustFiltersText = useLocalizedContent(
    "Try adjusting your filters to find more jobs.",
    "尝试调整筛选条件以找到更多职位。"
  );
  const showingText = useLocalizedContent("Showing", "显示");
  const toText = useLocalizedContent("to", "到");
  const ofText = useLocalizedContent("of", "共");

  useEffect(() => {
    setCurrentPage(pageNumber - 1);
  }, [pageNumber]);

  useEffect(() => {
    const newOffset = (pageNumber - 1) * itemsPerPage;
    setItemOffset(newOffset);
  }, [searchParams, itemsPerPage]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;

    const newOffset = (pageNumber - 1) * itemsPerPage;
    setItemOffset(newOffset);
  }, [searchParams, itemsPerPage]);

  useEffect(() => {
    const sortParam = searchParams.get("sort") || "";
    setShortValue(sortParam);
  }, [searchParams]);

  // **分页处理**
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setCurrentPage(event.selected);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", newPage.toString());
    router.push(`/job-grid-v2?${updatedParams.toString()}`, { scroll: false } as any);
  };

  // **排序处理**
  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("sort", item.value);
    router.push(`/job-grid-v2?${updatedParams.toString()}`, { scroll: false } as any);
  };

  return (
    <>
      <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <FilterAreaTwo />
            </div>

            <div className="col-12">
              <div className="job-post-item-wrapper">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-25 mt-70 lg-mt-40">
                  <div className="total-job-found">
                   {totalJobsText} <span className="text-dark">{totalCount}</span> {jobsFoundText}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">{sortLabel}</div>
                      <NewNiceSelect
                        options={[
                          { value: "", label: defaultOption  },
                          { value: "price-low-to-high", label: lowToHigh },
                          { value: "price-high-to-low", label: highToLow },
                        ]}
                        value={shortValue}
                        onChange={(item) => handleShort(item)}
                        name="Sort"
                      />
                    </div>
                    <button
                      onClick={() => dispatch(setGridType(true))}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                       ${gridType ? "" : "active"}`}
                      title="Active List"
                    >
                      <i className="bi bi-list"></i>
                    </button>
                    <button
                      onClick={() => dispatch(setGridType(false))}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                      ${gridType ? "active" : ""}`}
                      title="Active Grid"
                    >
                      <i className="bi bi-grid"></i>
                    </button>
                  </div>
                </div>

                {currentItems.length === 0 ? (
                  <div className="no-jobs-found text-center py-5">
                    <h3 className="text-dark fw-bold">{noJobsText}</h3>
                    <p className="text-muted">{adjustFiltersText}</p>
                  </div>
                ) : (
                  <>
                    {/* List View */}
                    <div className={`accordion-box list-style ${!gridType ? "show" : ""}`}>
                      {currentItems.map((job: IJobType) => (
                        <ListItemTwo key={job.id} item={job} />
                      ))}
                    </div>

                    {/* Grid View */}
                    <div className={`accordion-box grid-style ${gridType ? "show" : ""}`}>
                      <div className="row">
                        {currentItems.map((job: IJobType) => (
                          <div key={job.id} className="col-sm-6 mb-30">
                            <JobGridItem item={job} style_2={true}/>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pagination */}
                    {totalCount > itemsPerPage && (
                      <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                        <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                          {showingText} <span className="text-dark fw-500">{itemOffset + 1}</span> {toText}{" "}
                          <span className="text-dark fw-500">{Math.min(itemOffset + itemsPerPage, totalCount)}</span> {ofText}{" "}
                          <span className="text-dark fw-500">{totalCount}</span>
                        </p>
                        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} currentPage={currentPage}/>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListV2Area;


// "use client";
// import React, { useState, useEffect } from "react";
// import job_data from "@/data/job-data";
// import ListItemTwo from "./list-item-2";
// import { IJobType } from "@/types/job-data-type";
// import Pagination from "@/ui/pagination";
// import JobGridItem from "../grid/job-grid-item";
// import { useAppSelector } from "@/redux/hook";
// import slugify from "slugify";
// import NiceSelect from "@/ui/nice-select";
// import FilterAreaTwo from "../filter/job-filter-2/filter-area-2";

// const JobListV2Area = ({ itemsPerPage,grid_style=false }: { itemsPerPage: number;grid_style?:boolean }) => {
//   let all_jobs = job_data;
//   const maxPrice = job_data.reduce((max, job) => {
//     return job.salary > max ? job.salary : max;
//   }, 0);
//   const { category, experience, job_type, location,english_fluency,search_key } = useAppSelector(
//     (state) => state.filter
//   );
//   const [currentItems, setCurrentItems] = useState<IJobType[] | null>(null);
//   const [filterItems, setFilterItems] = useState<IJobType[]>([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const [jobType, setJobType] = useState(grid_style ?"grid" : "list");
//   const [priceValue, setPriceValue] = useState([0, maxPrice]);
//   const [shortValue, setShortValue] = useState("");

//   useEffect(() => {
//     // Filter the job_data array based on the selected filters
//     let filteredData = all_jobs
//     .filter((item) => category.length !== 0 ? category.some((c) => item.category.includes(c)) : true)
//     .filter((item) =>
//       experience.length !== 0
//         ? experience.some((e) => item.experience.trim().toLowerCase() === e.trim().toLowerCase()) : true
//     )
//     .filter((e) => english_fluency ? e.english_fluency.toLowerCase() === english_fluency.toLowerCase() : true)
//     .filter((item) => search_key ? item.title.toLowerCase().includes(search_key.toLowerCase()) : true)
//     .filter((item) => (job_type ? item.duration === job_type : true))
//     .filter((l) => location ? slugify(l.location.split(',').join('-').toLowerCase(),'-') === location : true)
//     .filter((j) => j.salary >= priceValue[0] && j.salary <= priceValue[1]);

//     if (shortValue === "price-low-to-high") {
//       filteredData = filteredData
//         .slice()
//         .sort((a, b) => Number(a.salary) - Number(b.salary));
//     }

//     if (shortValue === "price-high-to-low") {
//       filteredData = filteredData
//         .slice()
//         .sort((a, b) => Number(b.salary) - Number(a.salary));
//     }

//     const endOffset = itemOffset + itemsPerPage;
//     setFilterItems(filteredData)
//     setCurrentItems(filteredData.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(filteredData.length / itemsPerPage));
//   }, [
//     itemOffset,
//     itemsPerPage,
//     category,
//     experience,
//     job_type,
//     location,
//     english_fluency,
//     all_jobs,
//     priceValue,
//     shortValue,
//     search_key
//   ]);

//   const handlePageClick = (event: { selected: number }) => {
//     const newOffset = (event.selected * itemsPerPage) % all_jobs.length;
//     setItemOffset(newOffset);
//   };
//   // handleShort
//   const handleShort = (item: { value: string; label: string }) => {
//     setShortValue(item.value);
//   };
//   return (
//     <>
//       <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <FilterAreaTwo
//                 maxPrice={maxPrice}
//                 priceValue={priceValue}
//                 setPriceValue={setPriceValue}
//               />
//             </div>

//             <div className="col-12">
//               <div className="job-post-item-wrapper">
//                 <div className="upper-filter d-flex justify-content-between align-items-center mb-25 mt-70 lg-mt-40">
//                   <div className="total-job-found">
//                     All <span className="text-dark">{all_jobs.length}</span>{" "}
//                     jobs found
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <div className="short-filter d-flex align-items-center">
//                       <div className="text-dark fw-500 me-2">Short:</div>
//                       <NiceSelect
//                         options={[
//                           { value: "", label: "Price Short" },
//                           { value: "price-low-to-high", label: "low to high" },
//                           { value: "price-high-to-low", label: "High to low" },
//                         ]}
//                         defaultCurrent={0}
//                         onChange={(item) => handleShort(item)}
//                         name="Price Short"
//                       />
//                     </div>
//                     <button
//                       onClick={() => setJobType("list")}
//                       className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
//                        ${jobType === "grid" ? "active" : ""}`}
//                       title="Active List"
//                     >
//                       <i className="bi bi-list"></i>
//                     </button>
//                     <button
//                       onClick={() => setJobType("grid")}
//                       className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
//                       ${jobType === "list" ? "active" : ""}`}
//                       title="Active Grid"
//                     >
//                       <i className="bi bi-grid"></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div
//                   className={`accordion-box list-style ${jobType === "list" ? "show" : ""}`}
//                 >
//                   {currentItems &&
//                     currentItems.map((job) => (
//                       <ListItemTwo key={job.id} item={job} />
//                     ))}
//                 </div>

//                 <div
//                   className={`accordion-box grid-style ${jobType === "grid" ? "show" : ""}`}
//                 >
//                   <div className="row">
//                     {currentItems &&
//                       currentItems.map((job) => (
//                         <div key={job.id} className="col-sm-6 mb-30">
//                           <JobGridItem item={job} />
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//                 {/* <!-- /.accordion-box --> */}

//                 {currentItems && (
//                   <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
//                     <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
//                       Showing{" "}
//                       <span className="text-dark fw-500">{itemOffset + 1}</span>{" "}
//                       to{" "}
//                       <span className="text-dark fw-500">
//                         {Math.min(
//                           itemOffset + itemsPerPage,
//                           currentItems.length
//                         )}
//                       </span>{" "}
//                       of{" "}
//                       <span className="text-dark fw-500">
//                         {filterItems.length}
//                       </span>
//                     </p>
//                     {filterItems.length > itemsPerPage && (
//                       <Pagination
//                         pageCount={pageCount}
//                         handlePageClick={handlePageClick}
//                       />
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default JobListV2Area;
