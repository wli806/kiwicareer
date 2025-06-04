import React, { useState, useEffect } from "react";
import DashboardHeader from "./dashboard-header";
import ChangePasswordArea from "./change-password";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAccountSettings, updateAccountSettings, updateField } from "@/redux/features/accountSettingSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardSettingArea = ({setIsOpenSidebar}:IProps) => {
  const dispatch = useAppDispatch();
  const { settings, error } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

  const title = useLocalizedContent("Account Settings", "账户设置");
  const editUpdate = useLocalizedContent("Edit & Update", "编辑并更新");
  const firstNameLabel = useLocalizedContent("First Name", "名字");
  const lastNameLabel = useLocalizedContent("Last Name", "姓氏");
  const emailLabel = useLocalizedContent("Email", "电子邮件");
  const phoneLabel = useLocalizedContent("Phone Number", "电话号码");
  const savingText = useLocalizedContent("Saving...", "保存中...");
  const saveText = useLocalizedContent("Save", "保存");
  const cancelText = useLocalizedContent("Cancel", "取消");

  useEffect(() => {
    dispatch(getAccountSettings({forceFetch : true}));
  }, [dispatch]);

  const handleInputChange = (field: keyof typeof settings, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
      await dispatch(updateAccountSettings(settings));
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(getAccountSettings({forceFetch : true}));
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">{title}</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">{editUpdate}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label>{firstNameLabel}</label>
                  <input
                    type="text"
                    value={settings.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label>{lastNameLabel}</label>
                  <input
                    type="text"
                    value={settings.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label>{emailLabel}</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label>{phoneLabel}</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center mt-30">
              <button type="submit" className="dash-btn-two tran3s me-3 rounded-3" disabled={loading}>
                {loading ? savingText : saveText}
              </button>
              <button type="button" className="dash-cancel-btn tran3s" onClick={handleCancel} disabled={loading}>
                {cancelText}
              </button>
            </div>
          </form>
        </div>

        {/* change password area */}
        <ChangePasswordArea />
        {/* change password area */}
      </div>
    </div>
  );
};

export default DashboardSettingArea;
