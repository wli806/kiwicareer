"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLanguage } from "@/redux/features/commonSlice";

const LanguageToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isChinese } = useAppSelector((state) => state.common);

  // 高亮样式（适用于当前选中的语言）
  const activeStyle = {
    fontWeight: "bold",
    color: "#234034",
    bgcolor: "#d1f34c",
    px: 1,
    py: 0.5,
    borderRadius: 1,
  };

  // 非选中语言样式，设置颜色为白色
  const inactiveStyle = {
    fontWeight: "normal",
    color: "#fff",
    bgcolor: "transparent",
    py: 0.5,
    borderRadius: 1,
    cursor: "pointer",
  };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      {isChinese ? (
        <>
          <Typography sx={activeStyle}>中文</Typography>
          <Typography sx={{ color: "#fff", mx: 0.5 }}>/</Typography>
          <Typography
            sx={inactiveStyle}
            onClick={() => dispatch(setLanguage(false))}
          >
            En
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={activeStyle}>En</Typography>
          <Typography sx={{ color: "#fff", mx: 0.5 }}>/</Typography>
          <Typography
            sx={inactiveStyle}
            onClick={() => dispatch(setLanguage(true))}
          >
            中文
          </Typography>
        </>
      )}
    </Box>
  );
};

export default LanguageToggle;
