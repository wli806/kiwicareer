import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { updatePassword } from "@/redux/features/authThunk";
import { notifySuccess, notifyError } from "@/utils/toast";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const ChangePasswordArea = () => {
  const dispatch = useAppDispatch();
  
  // 🔹 组件状态
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changePasswordTitle = useLocalizedContent("Change Password", "修改密码");
  const oldPasswordLabel = useLocalizedContent("Old Password*", "旧密码*");
  const newPasswordLabel = useLocalizedContent("New Password*", "新密码*");
  const confirmPasswordLabel = useLocalizedContent("Confirm Password*", "确认密码*");
  const updatingText = useLocalizedContent("Updating...", "更新中...");
  const saveAndUpdateText = useLocalizedContent("Save & Update", "保存并更新");
  const mismatchText = useLocalizedContent("New passwords do not match!", "新密码与确认密码不匹配!");

  // 🔹 提交密码修改
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1️⃣ 校验新密码和确认密码是否匹配
    if (newPassword !== confirmPassword) {
      notifyError(mismatchText);
      return;
    }

    // 2️⃣ 发送请求
    setLoading(true);
    try {
      await dispatch(updatePassword({ oldPassword, newPassword })).unwrap();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      notifyError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-45">
      <div className="position-relative">
        <h2 className="main-title">{changePasswordTitle}</h2>
        <div className="bg-white card-box border-20">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label>{oldPasswordLabel}</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label>{newPasswordLabel}</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label>{confirmPasswordLabel}</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center">
              <button type="submit" className="dash-btn-two tran3s rounded-3" disabled={loading}>
               {loading ? updatingText : saveAndUpdateText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordArea;
