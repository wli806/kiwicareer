"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menus from "./component/menus";
import logo from "@/assets/images/logo/new_logo_revert.png";
import logo2 from "@/assets/images/logo/new_logo_revert_vertical.png"
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import CategoryDropdown from "./component/category-dropdown";
import LoginModal from "@/app/components/common/popup/login-modal";
import useSticky from "@/hooks/use-sticky";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logoutUser } from "@/redux/features/authThunk";
import { useRouter } from "next/navigation";
import LanguageToggleButton from "@/app/components/common/LanguageToggleBtn";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const Header = () => {
  const {sticky} = useSticky()
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [hydrated, setHydrated] = useState(false);

  const loginText = useLocalizedContent("Login", "登录");
  const dashboardText = useLocalizedContent("Dashboard", "个人看板");
  const applyText = useLocalizedContent("Apply Job", "申请职位");

  useEffect(() => {
    // 标记组件在客户端已经挂载
    setHydrated(true);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser()).unwrap().then(() => {
      router.push("/"); // 在登出完成后跳转到主页
    });
  };

  // 延迟渲染，确保 SSR 与 CSR 一致性
  if (!hydrated) {
    return null;
  }

  return (
    <>
    <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${sticky?'fixed':''}`}>
      <div className="inner-content position-relative">
        <div className="top-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo order-lg-0 logo-centered">
              <Link href="/" className="d-flex align-items-center">
                <Image src={logo} alt="logo" priority />
              </Link>
            </div>
            <div className="right-widget ms-auto order-lg-3 d-flex align-items-center">
              <LanguageToggleButton />
 
              <div className="right-widget ms-3 order-lg-3 d-none d-md-block">

                  {!isAuthenticated ? (
                    // 用户未登录时显示 Login 按钮
                    <>
                      {/* <li className="d-none d-md-block">
                        <Link href="/register" className="job-post-btn tran3s">
                          Post Job
                        </Link>
                      </li> */}
                        <a
                          href="#"
                          className="login-btn-one"
                          data-bs-toggle="modal"
                          data-bs-target="#loginModal"
                        >
                          {loginText}
                        </a>
                      {/* <li className="d-none d-md-block ms-4">
                        <Link href="/candidates-v1" className="btn-one">
                          Hire Top Talents
                        </Link>
                      </li> */}
                    </>
                  ) : (
                    // 用户已登录时显示用户相关的 UI
                    <a
                      className="login-btn-one"
                      href="/dashboard/candidate-dashboard/profile"
                      role="button"
                      style={{textDecoration: "none"}}
                    >
                      {dashboardText}
                    </a>

                  )}

              </div>
            </div>
            <nav className="navbar navbar-expand-lg p0 ms-lg-5 ms-3 order-lg-2">
              <button
                className="navbar-toggler d-block d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav align-items-lg-center">
                  <li className="d-block d-lg-none d-flex align-items-center align-item-center">
                    <div className="logo">
                      <Link href="/" className="d-block">
                        <Image src={logo2} alt="logo" width={200} priority />
                      </Link>
                    </div>
                  </li>
                  {/* <li className="nav-item dropdown category-btn mega-dropdown-sm">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      <i className="bi bi-grid-fill"></i> Category
                    </a>
                    <CategoryDropdown />
                  </li> */}
                  {/* menus start */}
                  <Menus />
                  {/* menus end */}
                  {/* <li className="d-md-none">
                    <Link href='/register' className="job-post-btn tran3s">
                      Post Job
                    </Link>
                  </li> */}
                  <li className="d-lg-none mt-20">
                    <Link href="/job-grid-v2" className="btn-five w-100">
                      {applyText}
                    </Link>
                  </li>
                  <li className="d-lg-none mt-20">
                    { !isAuthenticated ? (
                      <a
                        href="#"
                        className="btn-twelve w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                      >
                        {loginText}
                      </a>
                    ) : (
                      <Link href="/dashboard/candidate-dashboard/profile" className="btn-twelve w-100">
                        {dashboardText}
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* login modal start */}
    <LoginModal/>
    {/* login modal end */}
    </>
  );
};

export default Header;
