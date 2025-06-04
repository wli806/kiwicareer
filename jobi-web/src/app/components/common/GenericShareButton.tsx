"use client";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

const GenericShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this company on Company Portal!",
          url: window.location.href,
        });
      } catch (err: any) {
        console.error("Share failed:", err.message);
      }
    } else {
      alert("Share not supported in your browser. Please copy the URL to share.");
    }
  };

  return (
    <IconButton onClick={handleShare} color="primary" aria-label="share">
      <ShareIcon sx={{ color: "#254035" }} />
    </IconButton>
  );
};

export default GenericShareButton;
