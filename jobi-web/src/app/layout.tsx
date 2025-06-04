import "./globals.scss";
import { Metadata } from "next";
import localFont from 'next/font/local';
import { EB_Garamond } from "next/font/google";
import BackToTopCom from "./components/common/back-to-top-com";
import { Providers } from "@/redux/provider";
import ClientLangWrapper from "./components/common/ClientLangWrapper";

const gordita = localFont({
  src: [
    {
      path: '../../public/assets/fonts/gordita/gordita_medium-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gordita/gordita_medium-webfont.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gordita/gordita_regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gordita/gordita_regular-webfont.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--gorditas-font'
})

const garamond = EB_Garamond({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--eb_garamond-font",
});

export const metadata: Metadata = {
  title: "KiwiCareer - Your Gateway to Premier New Zealand Job Opportunities",
  description: "Discover your dream job and connect with top employers in New Zealand on KiwiCareer, the leading job portal and job board for career advancement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true} className={`${gordita.variable} ${garamond.variable}`}>
        <Providers>
          <ClientLangWrapper>{children}</ClientLangWrapper>
        </Providers>
        <BackToTopCom />
      </body>
    </html>
  );
}
