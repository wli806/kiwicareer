"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/images/logo/new_logo_ori.png";
import avatar from "@/assets/dashboard/images/avatar_01.jpg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import profile_icon_2 from "@/assets/dashboard/images/icon/icon_24.svg";
import profile_icon_3 from "@/assets/dashboard/images/icon/icon_25.svg";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_8.svg";
import nav_41 from "@/assets/dashboard/images/icon/icon_41.svg";
import nav_41_active from "@/assets/dashboard/images/icon/icon_41_active.svg";
import LogoutModal from "../../common/popup/logout-modal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { getUserProfile } from '@/redux/features/profilesSlice';
import { logoutUser } from "@/redux/features/authThunk";
import { Avatar } from "@mui/material";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// nav data
// const nav_data: {
//   id: number;
//   icon: StaticImageData;
//   icon_active: StaticImageData;
//   link: string;
//   title: string;
// }[] = [
//   // {
//   //   id: 1,
//   //   icon: nav_1,
//   //   icon_active: nav_1_active,
//   //   link: "/dashboard/candidate-dashboard",
//   //   title: "Dashboard",
//   // },
//   {
//     id: 2,
//     icon: nav_2,
//     icon_active: nav_2_active,
//     link: "/dashboard/candidate-dashboard/profile",
//     title: "My Profile",
//   },
//   {
//     id: 3,
//     icon: nav_3,
//     icon_active: nav_3_active,
//     link: "/dashboard/candidate-dashboard/resume",
//     title: "Resume",
//   },
//   // {
//   //   id: 4,
//   //   icon: nav_4,
//   //   icon_active: nav_4_active,
//   //   link: "/dashboard/candidate-dashboard/messages",
//   //   title: "Messages",
//   // },
//   // {
//   //   id: 5,
//   //   icon: nav_5,
//   //   icon_active: nav_5_active,
//   //   link: "/dashboard/candidate-dashboard/job-alert",
//   //   title: "Job Alert",
//   // },
//   {
//     id: 6,
//     icon: nav_6,
//     icon_active: nav_6_active,
//     link: "/dashboard/candidate-dashboard/saved-job",
//     title: "Saved Job",
//   },
//     {
//     id: 5,
//     icon: nav_41,
//     icon_active: nav_41_active,
//     link: "/dashboard/candidate-dashboard/applied-job",
//     title: "Applied Job",
//   },
//   {
//     id: 7,
//     icon: nav_7,
//     icon_active: nav_7_active,
//     link: "/dashboard/candidate-dashboard/setting",
//     title: "Account Settings",
//   },
// ];
// props type 
type IProps = {
  isOpenSidebar: boolean,
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const CandidateAside = ({isOpenSidebar,setIsOpenSidebar}:IProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile.profile);

  // 如果 Redux 中没有数据，则提供一个默认值（但一旦加载过就不会再重置）
  const profileData = profile || {
    avatar_url: "",
    fullName: "KiwiCareer User",
    bio: "",
    socialLinks: [""],
  };


  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        router.push("/"); // 跳转到主页
      });
  };

  useEffect(() => {
    import('@/redux/features/profilesSlice').then(({ getUserProfile }) => {
      dispatch(getUserProfile({ forceFetch: false }));
    });
  }, [dispatch]);
  

  // useEffect(() => {
  //   if (profile) {
  //     setProfileData({
  //       ...profile,
  //       socialLinks: profile.socialLinks?.length ? profile.socialLinks : [""],
  //     });
  //   }
  // }, [profile]);

  const myProfileText = useLocalizedContent("My Profile", "个人资料");
  const resumeText = useLocalizedContent("Resume", "我的简历");
  const savedJobText = useLocalizedContent("Saved Job", "已保存职位");
  const appliedJobText = useLocalizedContent("Applied Job", "已申请职位");
  const accountSettingsText = useLocalizedContent("Account Settings", "账户设置");
  const logoutText = useLocalizedContent("Logout", "退出登录");

  const nav_data: {
    id: number;
    icon: StaticImageData;
    icon_active: StaticImageData;
    link: string;
    title: string;
  }[] = [
    // {
    //   id: 1,
    //   icon: nav_1,
    //   icon_active: nav_1_active,
    //   link: "/dashboard/candidate-dashboard",
    //   title: "Dashboard",
    // },
    {
      id: 2,
      icon: nav_2,
      icon_active: nav_2_active,
      link: "/dashboard/candidate-dashboard/profile",
      title: myProfileText,
    },
    {
      id: 3,
      icon: nav_3,
      icon_active: nav_3_active,
      link: "/dashboard/candidate-dashboard/resume",
      title: resumeText,
    },
    // {
    //   id: 4,
    //   icon: nav_4,
    //   icon_active: nav_4_active,
    //   link: "/dashboard/candidate-dashboard/messages",
    //   title: "Messages",
    // },
    // {
    //   id: 5,
    //   icon: nav_5,
    //   icon_active: nav_5_active,
    //   link: "/dashboard/candidate-dashboard/job-alert",
    //   title: "Job Alert",
    // },
    {
      id: 6,
      icon: nav_6,
      icon_active: nav_6_active,
      link: "/dashboard/candidate-dashboard/saved-job",
      title: savedJobText,
    },
      {
      id: 5,
      icon: nav_41,
      icon_active: nav_41_active,
      link: "/dashboard/candidate-dashboard/applied-job",
      title: appliedJobText,
    },
    {
      id: 7,
      icon: nav_7,
      icon_active: nav_7_active,
      link: "/dashboard/candidate-dashboard/setting",
      title: accountSettingsText,
    },
  ];

  return (
    <>
    <aside className={`dash-aside-navbar ${isOpenSidebar?'show':''}`}>
      <div className="position-relative">
        <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
          <Link href="/">
            <Image src={logo} alt="logo" priority />
          </Link>
          <button onClick={() => setIsOpenSidebar(false)} className="close-btn d-block d-md-none">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="user-data">
          <div className="user-avatar position-relative rounded-circle">
            {/* <Image src={avatar} alt="avatar" className="lazy-img" style={{height:'auto'}} /> */}
            <Avatar
              src={profileData.avatar_url || ""}
              sx={{ width: {xs: 55, sm: 60, md: 65, lg: 70, xl: 75}, height: {xs: 55, sm: 60, md: 65, lg: 70, xl: 75}, borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div className="user-name-data">
            <button
              className="user-name"
              type="button"
              id="profile-dropdown"
            >
              {profileData.fullName} 
            </button>
            {/* <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_1} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_2} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Account Settings</span>
                </Link>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <Image src={profile_icon_3} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Notification</span>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
        <nav className="dasboard-main-nav">
          <ul className="style-none">
            {nav_data.map((m) => {
              const isActive = pathname === m.link;
              return (
                <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                  <Link
                    href={m.link}
                    className={`d-flex w-100 align-items-center ${isActive ? "active" : ""}`}
                  >
                    <Image
                      src={isActive ? m.icon_active : m.icon}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span>{m.title}</span>
                  </Link>
                </li>
              );
            })}
            {/* <li>
              <a
                href="#"
                className="d-flex w-100 align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <Image src={nav_8} alt="icon" className="lazy-img" />
                <span>Delete Account</span>
              </a>
            </li> */}
          </ul>
        </nav>
        <div className="profile-complete-status">
          {/* <div className="progress-value fw-500">87%</div>
          <div className="progress-line position-relative">
            <div className="inner-line" style={{ width: "80%" }}></div>
          </div>
          <p>Profile Complete</p> */}
        </div>

        <a href="#" className="d-flex w-100 align-items-center logout-btn" onClick={handleLogout}>
          <Image src={logout} alt="icon" className="lazy-img" />
          <span>{logoutText}</span>
        </a>
      </div>
    </aside>
    {/* LogoutModal star */}
    <LogoutModal/>
    {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
