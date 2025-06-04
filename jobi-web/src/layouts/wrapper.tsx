"use client";
import React, { useEffect } from "react";
import {  setCategories, setLocations } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { animationCreate } from "@/utils/utils";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { categories, locations } = useAppSelector((state) => state.filter);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    animationCreate();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!auth.isAuthenticated && window.location.pathname.includes("dashboard")) {
        router.replace("/");
      }
    }
  }, [auth.isAuthenticated, router]);

  useEffect(() => {
    if (categories.length === 0 || locations.length === 0) {
      const fetchFilters = async () => {
        try {
          const response = await fetch(`${process.env.API_BASE_URL}/jobs/filters`);
          const data = await response.json();
          dispatch(
            setCategories(
              data.categories ||
                [
                  "Accounting",
                  "Administration & Office Support",
                  "Advertising, Arts & Media",
                  "Agriculture, Animals & Environment",
                  "Banking & Financial Services",
                  "Call Center & Customer Service",
                  "CEO & General Management",
                  "Community Services & Development",
                  "Construction",
                  "Consulting & Strategy",
                  "Design & Architecture",
                  "Education & Training",
                  "Engineering",
                  "Government & Defense",
                  "Healthcare",
                  "Hospitality & Tourism",
                  "Human Resources & Recruitment",
                  "Information & Communication Technology",
                  "Insurance & Superannuation",
                  "Legal",
                  "Manufacturing, Transport & Logistics",
                  "Marketing & Communications",
                  "Mining, Resources & Energy",
                  "Other",
                  "Real Estate & Property",
                  "Retail & Consumer Products",
                  "Sales",
                  "Science & Technology",
                  "Self-Employment",
                  "Sports & Recreation",
                  "Trades & Services",
                ]
            )
          );
          dispatch(
            setLocations(
              data.locations ||
                [
                  "Auckland",
                  "Bay Of Plenty",
                  "Canterbury",
                  "Gisborne",
                  "Hawke's Bay",
                  "Manawatu",
                  "Marlborough",
                  "Nelson",
                  "Northland",
                  "Otago",
                  "Southland",
                  "Taranaki",
                  "Waikato",
                  "Wellington",
                  "West Coast",
                  "Work Remotely",
                ]
            )
          );
        } catch (error) {
          console.error("Failed to fetch filters:", error);
        }
      };

      fetchFilters();
    }
  }, [categories, locations, dispatch]);

  return (
    <>
      {children} 
      <ToastContainer />
    </>
  );
};

export default Wrapper;
