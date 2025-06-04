import { StaticImageData } from "next/image";

export interface IJobType {
  id: number;
  title: string;
  duration: string;
  date: string;
  experience: string;
  display_salary: string;
  normalized_hourly_salary: number;
  english_fluency: string;
  overview: string;
  details?: string; // 只有 `get_job_by_id` 端点返回 `details`
  company_name: string;
  company_logo: string;
  category_name: string;
  location: string; // 直接格式化为 `suburb, city` 或 `city`
  is_wishlisted: boolean;
  is_applied: boolean;
}
