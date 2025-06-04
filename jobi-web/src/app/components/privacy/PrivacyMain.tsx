"use client";
import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const PrivacyMain: React.FC = () => {
  const titleText = useLocalizedContent("Privacy Policy", "隐私政策");
  const introText = useLocalizedContent(
    "Your privacy matters! Please review our Privacy Policy carefully.",
    "您的隐私很重要！请仔细阅读我们的隐私政策。"
  );
  const paragraphText = useLocalizedContent(
    "Welcome to our website. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our platform. By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our website.",
    "欢迎访问我们的网站。本隐私政策解释了您在访问我们平台时，我们如何收集、使用和保护您的个人信息。使用本网站即表示您同意按照本政策收集和使用信息。如果您不同意我们的做法，请勿使用本网站。"
  );
  const informationCollectionTitle = useLocalizedContent(
    "Information Collection",
    "信息收集"
  );
  const informationCollectionText = useLocalizedContent(
    "We may collect personal information such as your name, email address, and other details when you register on our website or use our services. Additionally, we may collect data about your interactions with our site through cookies and similar technologies.",
    "当您在本网站注册或使用我们的服务时，我们可能会收集您的姓名、电子邮件地址以及其他详细信息。此外，我们还可能通过 cookies 和类似技术收集您与本网站互动的数据。"
  );
  const useOfInformationTitle = useLocalizedContent(
    "Use of Information",
    "信息的使用"
  );
  const useOfInformationText = useLocalizedContent(
    "The information we collect is used to improve our services, personalize your experience, and communicate with you. We may also use your information to send periodic emails regarding updates, new features, or promotional offers.",
    "我们收集的信息用于改进我们的服务、个性化您的体验以及与您沟通。我们也可能使用您的信息定期发送有关更新、新功能或促销优惠的电子邮件。"
  );
  const dataSecurityTitle = useLocalizedContent(
    "Data Security",
    "数据安全"
  );
  const dataSecurityText = useLocalizedContent(
    "We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
    "我们采取了多种安全措施来保障您的个人信息安全。然而，请注意，没有任何一种互联网传输方式是百分之百安全的，我们无法保证绝对安全。"
  );
  const thirdPartyDisclosureTitle = useLocalizedContent(
    "Third-Party Disclosure",
    "第三方披露"
  );
  const thirdPartyDisclosureText = useLocalizedContent(
    "We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services, comply with the law, or protect our rights.",
    "除非必要以提供服务、遵守法律或保护我们的权益，否则我们不会出售、交易或以其他方式转让您的个人信息给外部方。"
  );
  const policyUpdatesTitle = useLocalizedContent(
    "Policy Updates",
    "政策更新"
  );
  const policyUpdatesText = useLocalizedContent(
    "We may update our Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of our website constitutes acceptance of those changes.",
    "我们可能会不时更新我们的隐私政策。任何更改都会在此页面上发布，您继续使用本网站即表示接受这些更改。"
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

        {/* 隐私政策内容 */}
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {paragraphText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {informationCollectionTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {informationCollectionText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {useOfInformationTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {useOfInformationText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {dataSecurityTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {dataSecurityText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {thirdPartyDisclosureTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {thirdPartyDisclosureText}
        </Typography>

        <Typography variant="h6" sx={{ color: "#234034", mt: 3, mb: 1, fontWeight: 500 }}>
          {policyUpdatesTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2, lineHeight: 1.8 }}>
          {policyUpdatesText}
        </Typography>

        <Typography variant="body2" sx={{ color: "#555", mt: 4 }}>
          {lastUpdated}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyMain;
