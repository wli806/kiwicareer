"use client"
import React, { useState, useEffect }from 'react';
import Image from 'next/image';
import { Avatar, IconButton } from "@mui/material";
import avatar from '@/assets/dashboard/images/avatar_02.jpg';
import search from '@/assets/dashboard/images/icon/icon_16.svg';
import DashboardHeader from './dashboard-header';
import CountrySelect from './country-select';
import CitySelect from './city-select';
import StateSelect from './state-select';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateUserProfile, getUserProfile } from '@/redux/features/profilesSlice';
import { notifyError } from '@/utils/toast';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

import JobPreferenceArea from "./JobPreferenceArea";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const DashboardProfileArea = ({setIsOpenSidebar}:IProps) => {

  const dispatch = useAppDispatch();
  const { profile, error } = useAppSelector((state) => state.profile);

  const [profileData, setProfileData] = useState({
    avatar_url: "",
    fullName: "",
    bio: "",
    socialLinks: ["", ""],
    isRecommandRequired: false,
    wishedJobCategories: [] as string[],
    wishedJobLocations: [] as string[],
    wishedJobTypes: [] as string[],
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const myProfileTitle = useLocalizedContent("My Profile", "我的资料");
  const uploadNewPhoto = useLocalizedContent("Upload new photo", "上传新照片");
  const deleteText = useLocalizedContent("Delete", "删除");
  const fullNameLabel = useLocalizedContent("Full Name*", "全名*");
  const fullNamePlaceholder = useLocalizedContent("Your full name", "请输入您的全名");
  const bioLabel = useLocalizedContent("Bio*", "个人简介*");
  const bioPlaceholder = useLocalizedContent("Write something interesting about you....", "写一些关于你的有趣描述...");
  const bioAlertText = useLocalizedContent(
    "Brief description for your profile. URLs are hyperlinked.",
    "为您的资料提供简短描述，URL 会自动生成链接。"
  );
  const socialMediaTitle = useLocalizedContent("Social Media", "社交媒体");
  const socialMediaPlaceholder = useLocalizedContent("Enter social media link", "请输入社交媒体链接");
  const addMoreLink = useLocalizedContent("Add more link", "添加更多链接");
  const saveText = useLocalizedContent("Save", "保存");
  const savingText = useLocalizedContent("Saving...", "保存中...");
  const cancelText = useLocalizedContent("Cancel", "取消");
  const fileSizeError = useLocalizedContent(
    "File size exceeds 2MB limit. Please choose a smaller photo.",
    "文件大小超过2MB限制，请选择更小的照片。"
  );

  useEffect(() => {
    dispatch(getUserProfile({forceFetch : false}));
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        ...profile,
        socialLinks: profile.socialLinks?.length ? profile.socialLinks : [""],
        wishedJobCategories: profile.wishedJobCategories || [],
        wishedJobLocations: profile.wishedJobLocations || [],
        wishedJobTypes: profile.wishedJobTypes || [],
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setProfileData({ ...profileData, [key]: e.target.value });
  };

  const handleSocialLinkChange = (index: number, value: string) => {
    const updatedLinks = [...profileData.socialLinks];
    updatedLinks[index] = value;
    setProfileData({ ...profileData, socialLinks: updatedLinks });
  };

  // 添加社交链接
  const handleAddSocialLink = () => {
    setProfileData({
      ...profileData,
      socialLinks: [...profileData.socialLinks, ""],
    });
  };

  // 删除社交链接
  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = profileData.socialLinks.filter((_, i) => i !== index);
    setProfileData({ ...profileData, socialLinks: updatedLinks.length ? updatedLinks : [""] });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        notifyError(fileSizeError);
        return;
      }

      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => setPreviewImage(e.target?.result as string);
      fileReader.readAsDataURL(file);
    }
  };

  const handleToggleEmailPush = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, isRecommandRequired: e.target.checked });
  };

  const handleDeleteAvatar = () => {
    setSelectedFile(null); // 清除已选择的文件
    setPreviewImage(null); // 清除预览图片
  };  

  const handleSave = async () => {
    setLoading(true);
    try {
    await dispatch(updateUserProfile({ profileData, selectedFile }))
      .unwrap()
      .then((updatedProfile) => {
        // 🔹 更新本地状态，避免重复上传
        setProfileData(updatedProfile);
        setSelectedFile(null);  // 清空文件，避免重复上传
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      })
    } finally {
      setLoading(false);
    };
  };
  
  const handleCancel = () => {
    dispatch(getUserProfile({forceFetch : true}));
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">{myProfileTitle}</h2>

        <div className="bg-white card-box border-20">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
          <div className="avatar-wrapper">
              <Avatar
                src={previewImage || profileData.avatar_url || ""}
                sx={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <div className="upload-btn position-relative tran3s ms-4 me-3">
              <label htmlFor="upload-avatar" className="cursor-pointer">{uploadNewPhoto}</label>
              <input
                accept="image/*"
                type="file"
                id="upload-avatar"
                hidden
                onChange={handleAvatarUpload}
              />
            </div>
            <button className="delete-btn tran3s" onClick={handleDeleteAvatar}>{deleteText}</button>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">{fullNameLabel}</label>
            <input
              type="text"
              placeholder={fullNamePlaceholder}
              value={profileData.fullName}
              onChange={(e) => handleInputChange(e, "fullName")}
            />
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">{bioLabel}</label>
            <textarea 
              className="size-lg" 
              placeholder={bioPlaceholder}
              value={profileData.bio}
              onChange={(e) => handleInputChange(e, "bio")}
            >
            </textarea>
            <div className="alert-text">{bioAlertText}</div>
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">{socialMediaTitle}</h4>
          {profileData.socialLinks.map((link, index) => (
            <div className="dash-input-wrapper mb-20 d-flex align-items-center" key={index}>
              <input
                type="text"
                className="flex-grow-1"
                placeholder={socialMediaPlaceholder}
                value={link}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
              />
              <button className="delete-btn tran3s ms-3" onClick={() => handleRemoveSocialLink(index)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
          <button className="dash-btn-one mt-2 d-inline-block" onClick={handleAddSocialLink}>
            <i className="bi bi-plus"></i> {addMoreLink}
          </button>
        </div>

        {/* <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Your address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange(e, "address")}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect/>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label> 
                <CitySelect/>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Zip Code*</label>
                <input type="number" placeholder="1708" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <StateSelect/>
              </div>
            </div>
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="position-relative">
                  <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                  <button className="location-pin tran3s"><Image src={search} alt="icon" className="lazy-img m-auto" /></button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe className="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* 岗位偏好区域 */}

        <JobPreferenceArea
          profileData={profileData}
          setProfileData={setProfileData}
          handleToggleEmailPush={handleToggleEmailPush}
        />

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            className={`dash-btn-two tran3s me-3 ${loading ? "loading" : ""}`}
            onClick={handleSave}
            disabled={loading}
          >
             {loading ? savingText : saveText}
          </button>
          <button className="dash-cancel-btn tran3s" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </button>
        </div>

        {error && <p className="error-text mt-3">{error}</p>}

      </div>
    </div>
  );
};

export default DashboardProfileArea;