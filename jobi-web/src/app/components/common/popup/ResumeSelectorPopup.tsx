"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemSecondaryAction,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getUserResumes, uploadUserResume, deleteUserResume } from "@/redux/features/resumeSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

type ResumeSelectorPopupProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (resumeUrl: string) => void;
};

const ResumeSelectorPopup: React.FC<ResumeSelectorPopupProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const dispatch = useAppDispatch();
  const { resumes } = useAppSelector((state) => state.resume);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const popupTitle = useLocalizedContent("Select a Resume", "选择简历");
  const popupDescription = useLocalizedContent(
    "Almost there! Please select or upload your resume to complete your application.",
    "最后一步！请选择或上传您的简历以完成申请。"
  );
  const uploadingText = useLocalizedContent("Uploading...", "上传中...");
  const uploadNewResumeText = useLocalizedContent("Upload New Resume", "上传新简历");
  const deletingText = useLocalizedContent("Deleting...", "删除中...");
  const selectResumeText = useLocalizedContent("Select Resume", "选择简历");
  const cancelText = useLocalizedContent("Cancel", "取消");
  const noResumeText = useLocalizedContent(
    "No resumes available. Please upload a resume.",
    "暂无简历，请上传简历。"
  );

  // 弹窗打开时加载简历列表
  useEffect(() => {
    if (open) {
      dispatch(getUserResumes());
    }
  }, [open, dispatch]);

  // 当有新文件选择时自动上传
  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  // 文件选择处理：先保存文件对象，再重置文件输入框
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ""; // 重置文件输入框
      setSelectedFile(file);
    }
  };

  // 上传文件
  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      dispatch(uploadUserResume(selectedFile))
        .unwrap()
        .then(() => {
          setSelectedFile(null);
          // 上传成功后刷新简历列表
          dispatch(getUserResumes());
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          setSelectedFile(null);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  // 删除简历操作
  const handleDeleteResume = (resumeUrl: string) => {
    setDeleting(resumeUrl);
    dispatch(deleteUserResume(resumeUrl))
      .unwrap()
      .then(() => {
        if (selectedResume === resumeUrl) {
          setSelectedResume(null);
        }
      })
      .finally(() => {
        setDeleting(null);
        dispatch(getUserResumes());
      });
  };
  

  // 当用户点击 “Select Resume” 按钮时
  const handleSelectResume = () => {
    if (selectedResume) {
      onSelect(selectedResume);
      onClose();
    }
  };

  // 弹窗关闭时重置选中项
  useEffect(() => {
    if (!open) {
      setSelectedResume(null);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#eff6f3",
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#234034",
          color: "#eff6f3",
          fontWeight: 600,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        {popupTitle}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#eff6f3",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* 介绍区域 */}
        <Typography
          variant="subtitle1"
          sx={{
            color: "#234034",
            fontWeight: 500,
          }}
        >
          {popupDescription}
        </Typography>
        {/* 简历列表区域：设置固定高度并滚动 */}
        <div
          className="dash-input-wrapper"
          style={{ maxHeight: 300, overflowY: "auto", backgroundColor: "#eff6f3", borderRadius: 8, padding: 8 }}
        >
          {resumes && resumes.length > 0 ? (
            <List disablePadding>
              {resumes.map((resume) => (
                <ListItem
                  key={resume.id}
                  component="div"
                  secondaryAction={
                    <Button
                      className="delete-btn"
                      onClick={() => handleDeleteResume(resume.resume_url)}
                      disabled={deleting === resume.resume_url}
                      sx={{
                        minWidth: "30px",
                        color: deleting === resume.resume_url ? "#999" : "#234034",
                      }}
                    >
                      {deleting === resume.resume_url ? deletingText : "X"}
                    </Button>
                  }
                  sx={{
                    p: 0,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: selectedResume === resume.resume_url ? "#d1f34c" : "#eff6f3",
                  }}
                >
                  <ListItemButton onClick={() => setSelectedResume(resume.resume_url)} sx={{ width: "100%" }}>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedResume === resume.resume_url}
                          onChange={() => setSelectedResume(resume.resume_url)}
                          value={resume.resume_url}
                          sx={{ color: "#234034" }}
                        />
                      }
                      label={
                        <ListItemText
                          primary={resume.original_filename}
                          secondary={new Date(resume.uploaded_at).toLocaleDateString()}
                        />
                      }
                      sx={{ width: "100%" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>{noResumeText}</Typography>
          )}
        </div>
        {/* 上传区域：该部分不滚动 */}
        <div
          className="upload-section"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <Button
            variant="contained"
            className="upload-btn"
            component="label"
            sx={{
              bgcolor: "#234034",
              color: "#eff6f3",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": { bgcolor: "#d1f34c", color: "black" },
            }}
            disabled={uploading}
          >
            {uploading ? uploadingText : uploadNewResumeText}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Button>
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          bgcolor: "#eff6f3",
          p: 2,
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <Button
          variant="contained"
          className="dash-btn-two tran3s"
          onClick={handleSelectResume}
          disabled={!selectedResume}
          sx={{
            bgcolor: "#234034",
            color: "#eff6f3",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { bgcolor: "#d1f34c", color: "black" },
          }}
        >
          {selectResumeText}
        </Button>
        <Button
          variant="outlined"
          className="dash-cancel-btn tran3s"
          onClick={onClose}
          sx={{
            borderColor: "#234034",
            color: "#234034",
            textTransform: "none",
            borderRadius: "8px",
            ml: 1,
          }}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResumeSelectorPopup;
