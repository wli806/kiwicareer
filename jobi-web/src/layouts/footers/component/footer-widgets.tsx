"use client";
import Link from 'next/link';
import React from 'react';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

export function WidgetOne({ cls,style_2 }: { cls: string;style_2?:boolean }) {
  const title = useLocalizedContent("Features", "职位与企业");
  const link1 = useLocalizedContent("Browse Jobs", "浏览职位");
  const link2 = useLocalizedContent("Companies", "浏览企业");

  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2?'text-white':''}`}>{title}</h5>
      <ul className="footer-nav-link style-none">
        <li><Link href="/job-grid-v2">{link1}</Link></li>
        <li><Link href="/company-v3">{link2}</Link></li>
        {/* <li><Link href="/candidates-v1">Candidates</Link></li>
        <li><Link href="/pricing">Pricing</Link></li> */}
      </ul>
    </div>
  )
}

export function WidgetTwo({ cls,style_2 }: { cls: string;style_2?:boolean }) {
  const title = useLocalizedContent("Company", "公司");
  const link1 = useLocalizedContent("About us", "关于我们");
  const link2 = useLocalizedContent("Contact", "联系我们");

  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2?'text-white':''}`}>{title}</h5>
      <ul className="footer-nav-link style-none">
        <li><Link href="/about-us">{link1}</Link></li>
        {/* <li><Link href="/blog-v2">Blogs</Link></li> */}
        {/* <li><Link href="/faq">FAQ’s</Link></li> */}
        <li><Link href='/contact'>{link2}</Link></li>
      </ul>
    </div>
  )
}

export function WidgetThree({ cls,style_2 }: { cls: string;style_2?:boolean }) {
  const title = useLocalizedContent("Support", "支持");
  const link1 = useLocalizedContent("Terms & conditions", "条款与条件");
  const link2 = useLocalizedContent("Privacy", "隐私政策");

  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2?'text-white':''}`}>{title}</h5>
      <ul className="footer-nav-link style-none">
        {/* <li><Link href='/contact'>Terms of use</Link></li> */}
        <li><Link href='/terms'>{link1}</Link></li>
        <li><Link href='/privacy'>{link2}</Link></li>
        {/* <li><Link href='/contact'>Cookie policy</Link></li> */}
      </ul>
    </div>
  )
}

