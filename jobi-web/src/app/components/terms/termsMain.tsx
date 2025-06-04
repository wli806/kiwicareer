"use client";
import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const TermsMain: React.FC = () => {
  // 使用 useLocalizedContent 获取各部分本地化文本
  const titleText = useLocalizedContent("Terms and Conditions", "条款与条件");
  const introText = useLocalizedContent(
    "Almost there! Please review our Terms and Conditions carefully.",
    "请仔细阅读我们的条款与条件。"
  );
  const paragraphText = useLocalizedContent(
    "Welcome to our website. These terms and conditions outline the rules and regulations for the use of our platform. By accessing this website, you accept these terms and conditions in full. If you disagree with any part of these terms and conditions, please do not use our website.",
    "欢迎访问我们的网站。这些条款与条件概述了您使用本平台的规则和规定。访问本网站即表示您完全接受这些条款，如果您不同意其中任何部分，请勿使用本网站。"
  );
  const intellectualPropertyTitle = useLocalizedContent("Intellectual Property", "知识产权");
  const intellectualPropertyText = useLocalizedContent(
    "Unless otherwise stated, we or our licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages for your own personal use, but you must not reuse any material without obtaining permission.",
    "除非另有说明，否则本网站上所有内容的知识产权归我们或我们的许可方所有。所有知识产权均受保护。您可以查看或打印页面供个人使用，但未经许可不得复制任何材料。"
  );
  const acceptableUseTitle = useLocalizedContent("Acceptable Use", "可接受的使用方式");
  const acceptableUseText = useLocalizedContent(
    "You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website. You must not use our website in any way which is unlawful, illegal, fraudulent, or harmful.",
    "您不得以任何可能损害网站、影响网站可用性或可访问性的方式使用本网站，也不得以任何非法、欺诈或有害的方式使用本网站。"
  );
  const userResponsibilitiesTitle = useLocalizedContent("User Responsibilities", "用户责任");
  const userResponsibilitiesText = useLocalizedContent(
    "As a user, you agree to use our website responsibly and ensure that your actions do not violate any laws or infringe upon the rights of others. Misuse of our services may result in termination of your access without notice.",
    "作为用户，您同意负责任地使用本网站，并确保您的行为不违反任何法律或侵犯他人权益。滥用我们的服务可能会导致您的访问被终止且不予通知。"
  );
  const limitationTitle = useLocalizedContent("Limitation of Liability", "责任限制");
  const limitationText = useLocalizedContent(
    "In no event shall we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our website. This includes any damages caused by viruses, bugs, or other technical issues.",
    "在任何情况下，我们均不对因您访问或使用本网站而产生的任何直接、间接、附带、后果性或惩罚性损害负责，包括由病毒、错误或其他技术问题引起的损害。"
  );
  const changesTitle = useLocalizedContent("Changes to Terms", "条款变更");
  const changesText = useLocalizedContent(
    "We reserve the right to update or change these terms and conditions at any time. It is your responsibility to check this page periodically for changes. Your continued use of the website constitutes acceptance of any changes.",
    "我们保留随时更新或更改这些条款与条件的权利。请定期查看本页面以了解更新信息。您继续使用本网站即表示接受任何变更。"
  );
  const lastUpdated = useLocalizedContent(
    "Last updated: February 6, 2025",
    "最后更新：2025年2月6日"
  );

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#eff6f3",
          borderRadius: "12px",
        }}
      >
        {/* 标题 */}
        <Typography variant="h4" sx={{ color: "#234034", mb: 2, fontWeight: 600 }}>
          {titleText}
        </Typography>

        {/* 介绍区域 */}
        <Box sx={{ mb: 3, p: 2, bgcolor: "#d1f34c", borderRadius: "8px" }}>
          <Typography variant="subtitle1" sx={{ color: "#234034", fontWeight: 500 }}>
            {introText}
          </Typography>
        </Box>

        {/* 展示内容 */}
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {paragraphText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {intellectualPropertyTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {intellectualPropertyText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {acceptableUseTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {acceptableUseText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {userResponsibilitiesTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {userResponsibilitiesText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {limitationTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {limitationText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {changesTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {changesText}
        </Typography>

        <Typography variant="body2" sx={{ color: "#555", mt: 4 }}>
          {lastUpdated}
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsMain;
