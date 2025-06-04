
"use client";
import React, { useState, useRef } from "react";
import { notifySuccess, notifyError } from "@/utils/toast";
import axios from "@/utils/axios";
import { useAppSelector } from "@/redux/hook";

interface WishlistButtonProps {
  jobId: number;
  isInitiallyWishlisted: boolean;
}

const WishlistButton = ({ jobId, isInitiallyWishlisted }: WishlistButtonProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isWishlisted, setIsWishlisted] = useState(isInitiallyWishlisted);
  const loginTriggerRef = useRef<HTMLAnchorElement | null>(null);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      loginTriggerRef.current?.click();
      return;
    }

    try {
      if (isWishlisted) {
        await axios.delete(`/jobs/wishlist/${jobId}`);
        notifySuccess("Job removed from wishlist.");
      } else {
        await axios.post(`/jobs/wishlist/${jobId}`, {});
        notifySuccess("Job added to wishlist!");
      }

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      notifyError("Failed to update wishlist.");
    }
  };

  return (
    <>
      <button
        onClick={handleWishlistToggle}
        className={`wishlist-btn text-center rounded-circle tran3s me-3 cursor-pointer ${isWishlisted ? "active" : ""}`}
        title={isWishlisted ? "Remove Job" : "Save Job"}
      >
        <i className={`bi ${isWishlisted ? "bi-bookmark-check-fill" : "bi-bookmark-dash"}`}></i>
      </button>

      <a ref={loginTriggerRef} href="#" className="d-none" data-bs-toggle="modal" data-bs-target="#loginModal"></a>
    </>
  );
};

export default WishlistButton;
