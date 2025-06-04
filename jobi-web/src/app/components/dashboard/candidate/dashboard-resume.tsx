"use client"
import React,{ useState , useEffect} from 'react';
import video_bg from '@/assets/dashboard/images/video_post.jpg';
import DashboardHeader from './dashboard-header';
import DashboardPortfolio from './dashboard-portfolio';
import SelectYear from './select-year';
// import VideoPopup from '../../common/video-popup';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getUserResumeDetails,
  getUserResumes,
  uploadUserResume,
  deleteUserResume,
  saveUserResumeDetails,
  setIntroduction,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addSkill,
  removeSkill,
} from "@/redux/features/resumeSlice";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardResume = ({setIsOpenSidebar}:IProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { resumes, loading, resumeDetails } = useAppSelector((state) => state.resume);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);


  const myResumeText = useLocalizedContent("My Resume", "我的简历");
  const resumeAttachmentText = useLocalizedContent("Resume Attachment", "简历附件");
  const cvAttachmentLabel = useLocalizedContent("CV Attachment*", "简历附件*");
  const deletingText = useLocalizedContent("Deleting...", "删除中...");
  const uploadCVText = useLocalizedContent("Upload CV", "上传简历");
  const uploadingText = useLocalizedContent("Uploading...", "上传中...");
  const uploadFileInfoText = useLocalizedContent("Upload file .pdf, .doc, .docx", "上传文件格式：.pdf, .doc, .docx");

  const introductionText = useLocalizedContent("Introduction", "简介");
  const introLabel = useLocalizedContent("Intro*", "简介*");
  const introPlaceholder = useLocalizedContent(
    "Write something interesting about you....",
    "写一些有趣的关于你的内容..."
  );
  const introAlertText = useLocalizedContent(
    "Brief description for your resume.",
    "简历的简要描述。"
  );

  const educationText = useLocalizedContent("Education", "教育经历");
  const educationAccordionPrefix = useLocalizedContent("Education #", "教育经历 #");
  const majorLabel = useLocalizedContent("Major*", "专业*");
  const academyLabel = useLocalizedContent("Academy*", "学校*");
  const yearLabel = useLocalizedContent("Year*", "年份*");
  const descriptionLabel = useLocalizedContent("Description*", "描述*");
  const removeEducationText = useLocalizedContent("Remove this Education", "删除此教育经历");
  const addMoreText = useLocalizedContent("Add more", "添加更多");

  const skillsExperienceText = useLocalizedContent("Skills & Experience", "技能与经验");
  const addSkillsLabel = useLocalizedContent("Add Skills*", "添加技能*");
  const skillPlaceholder = useLocalizedContent("Type skill and click Add", "输入技能后点击添加");
  const addSkillsText = useLocalizedContent("Add Skills", "添加技能");
  const addWorkExperienceLabel = useLocalizedContent("Add Work Experience*", "添加工作经历*");
  const experienceAccordionPrefix = useLocalizedContent("Experience #", "工作经历 #");
  const titleLabel = useLocalizedContent("Title*", "职位*");
  const companyLabel = useLocalizedContent("Company*", "公司*");
  // yearLabel 与 descriptionLabel可复用
  const removeExperienceText = useLocalizedContent("Remove this Experience", "删除此工作经历");

  const saveText = useLocalizedContent("Save", "保存");
  const savingText = useLocalizedContent("Saving...", "保存中...");
  const cancelText = useLocalizedContent("Cancel", "取消");

  useEffect(() => {
    dispatch(getUserResumeDetails({forceFetch : false}));
    dispatch(getUserResumes());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]); 

  // 处理简历上传
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; // 先保存文件对象
      event.target.value = ""; // 清空文件输入框的值
      setSelectedFile(file);
    }
  };
  

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      dispatch(uploadUserResume(selectedFile))
        .unwrap()
        .then(() => {
          setSelectedFile(null);
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

  // 处理删除简历
  const handleDeleteResume = (resumeUrl: string) => {
    setDeleting(resumeUrl);
    dispatch(deleteUserResume(resumeUrl))
      .unwrap()
      .finally(() => {
        setDeleting(null);
      });
  };

  const formatUploadDate = (uploadedAt: string) => {
    const parts = uploadedAt.split(" ");
    if (parts.length >= 4) {
      return `${parts[1]} ${parts[2]} ${parts[3]}`;
    }
    return uploadedAt;
  };

 // ========== Intro - 直接使用 Redux ========== //
  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setIntroduction(e.target.value));
  };

  // ========== Education ========== //
  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleRemoveEducation = (id: string) => {
    dispatch(removeEducation(id));
  };

  const handleChangeEducation = (
    id: string,
    field: keyof Omit<typeof resumeDetails.educations[number], "id">,
    value: string
  ) => {
    dispatch(
      updateEducation({ id, field, value })
    );
  };

  // ========== Experience ========== //
  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleRemoveExperience = (id: string) => {
    dispatch(removeExperience(id));
  };

  const handleChangeExperience = (
    id: string,
    field: keyof Omit<typeof resumeDetails.experiences[number], "id">,
    value: string
  ) => {
    dispatch(
      updateExperience({ id, field, value })
    );
  };

  // ========== Skills ========== //
  const [skillInput, setSkillInput] = useState("");
  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    dispatch(addSkill(skillInput.trim()));
    setSkillInput("");
  };
  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill));
  };

  // ========== Save 所有信息到后端 ========== //
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await dispatch(saveUserResumeDetails()).unwrap();
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };
  
  const handleCancel = () => {
    dispatch(getUserResumeDetails({forceFetch : true}));
  };

  return (
    <>
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar}/>
        {/* header end */}

        <h2 className="main-title">{myResumeText}</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">{resumeAttachmentText}</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">{cvAttachmentLabel}</label>

            {resumes?.map((resume) => (
                <div key={resume.id} className="attached-file d-flex align-items-center justify-content-between mb-15">
                  <div>
                    <a href={resume.resume_url} target="_blank" rel="noopener noreferrer">
                      {resume.original_filename}
                    </a>
                    <span className="ms-2 text-muted">({formatUploadDate(resume.uploaded_at)})</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleDeleteResume(resume.resume_url)}
                    disabled={deleting === resume.resume_url}
                  >
                    {deleting === resume.resume_url ? <span className="small-text">{deletingText}</span> : <i className="bi bi-x"></i>}
                  </button>
                </div>
              ))}
            </div>

          <div className="dash-btn-one d-inline-block position-relative me-3">
            <label htmlFor="upload-cv" className="cursor-pointer d-flex align-items-center">
              <i className="bi bi-plus me-2"></i> {uploading ? uploadingText : uploadCVText}
            </label>
            <input
              type="file"
              id="upload-cv"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
          <small>{uploadFileInfoText}</small>
        </div>


        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">{introductionText}</h4>
          <div className="dash-input-wrapper mb-35 md-mb-20">
            <label htmlFor="">{introLabel}</label>
            <textarea
                className="size-lg"
                placeholder="Write something interesting about you...."
                value={resumeDetails.introduction}
                onChange={handleIntroChange}
              />
            <div className="alert-text">{introAlertText}</div>
          </div>

          {/* <div className="row">
            <div className="col-sm-6 d-flex">
              <div className="intro-video-post position-relative mt-20" style={{ backgroundImage: `url(${video_bg.src})` }}>
                <a className="fancybox rounded-circle video-icon tran3s text-center" onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }}>
                  <i className="bi bi-play"></i>
                </a>
                <a href="#" className="close"><i className="bi bi-x"></i></a>
              </div>
            </div>
            <div className="col-sm-6 d-flex">
              <div className="intro-video-post position-relative empty mt-20">
                <span>+ Add Intro Video</span>
                <input type="file" id="uploadVdo" name="uploadVdo" placeholder="" />
              </div>
            </div>
          </div> */}
        </div>


        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">{educationText}</h4>

          <div className="accordion dash-accordion-one" id="accordionEducation">
            {resumeDetails.educations?.map((edu, idx) => {
              // 为每个 edu 生成唯一的 headingId 和 collapseId
              const headingId = `headingEdu-${edu.id}`;
              const collapseId = `collapseEdu-${edu.id}`;
              return (
                <div className="accordion-item mb-3" key={edu.id}>
                  <h2 className="accordion-header" id={headingId}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded="false"
                      aria-controls={collapseId}
                    >
                      {`${educationAccordionPrefix}${idx + 1}`}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headingId}
                    data-bs-parent="#accordionEducation"
                  >
                    <div className="accordion-body">
                      {/* --- Education Form Fields --- */}
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label>{majorLabel}</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              type="text"
                              placeholder="e.g. Product Designer (Google)"
                              value={edu.title}
                              onChange={(e) =>
                                handleChangeEducation(edu.id, "title", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label>{academyLabel}</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              type="text"
                              placeholder="Google Arts Collage & University"
                              value={edu.academy}
                              onChange={(e) =>
                                handleChangeEducation(edu.id, "academy", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label>{yearLabel}</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="row">
                            <div className="col-sm-6">
                              <SelectYear
                                value={edu.startYear}
                                onChange={(val) =>
                                  handleChangeEducation(edu.id, "startYear", val)
                                }
                              />
                            </div>
                            <div className="col-sm-6">
                              <SelectYear
                                value={edu.endYear}
                                onChange={(val) =>
                                  handleChangeEducation(edu.id, "endYear", val)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label>{descriptionLabel}</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <textarea
                              className="size-lg"
                              placeholder="Some details here..."
                              value={edu.description}
                              onChange={(e) =>
                                handleChangeEducation(edu.id, "description", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {resumeDetails.educations.length > 1 && (
                        <button
                          className="dash-cancel-btn"
                          onClick={() => handleRemoveEducation(edu.id)}
                        >
                          {removeEducationText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

            <button className="dash-btn-one" onClick={handleAddEducation}>
              <i className="bi bi-plus"></i> {addMoreText}
            </button>
          </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">{skillsExperienceText}</h4>
          <div className="dash-input-wrapper mb-40">
              <label>{addSkillsLabel}</label>
              <div className="mb-2 d-flex">
                <input
                  className="form-control"
                  placeholder={skillPlaceholder}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button className="dash-btn-one ms-2" onClick={handleAddSkill}>
                {addSkillsText}
                </button>
              </div>

              {resumeDetails.skills && resumeDetails.skills.length > 0 && (
                <div className="skills-wrapper">
                  <ul className="style-none d-flex flex-wrap align-items-center">
                    {resumeDetails.skills.map((skill) => (
                      <li key={skill} className="is_tag">
                        <button onClick={() => handleRemoveSkill(skill)}>
                          {skill} <i className="bi bi-x"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>


          <div className="dash-input-wrapper mb-15">
            <label htmlFor="">{addWorkExperienceLabel}</label>
          </div>

          <div className="accordion dash-accordion-one" id="accordionExperience">
              {resumeDetails.experiences?.map((exp, idx) => {
                const headingId = `headingExp-${exp.id}`;
                const collapseId = `collapseExp-${exp.id}`;
                return (
                  <div className="accordion-item mb-3" key={exp.id}>
                    <h2 className="accordion-header" id={headingId}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded="false"
                        aria-controls={collapseId}
                      >
                        {`${experienceAccordionPrefix}${idx + 1}`}
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className="accordion-collapse collapse"
                      aria-labelledby={headingId}
                      data-bs-parent="#accordionExperience"
                    >
                      <div className="accordion-body">
                        {/* Experience form fields */}
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label>{titleLabel}</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <input
                                type="text"
                                placeholder="Lead Product Designer"
                                value={exp.title}
                                onChange={(e) =>
                                  handleChangeExperience(exp.id, "title", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label>{companyLabel}</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <input
                                type="text"
                                placeholder="Amazon Inc"
                                value={exp.company}
                                onChange={(e) =>
                                  handleChangeExperience(exp.id, "company", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label>{yearLabel}</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="col-sm-6">
                                <SelectYear
                                  value={exp.startYear}
                                  onChange={(val) =>
                                    handleChangeExperience(exp.id, "startYear", val)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <SelectYear
                                  value={exp.endYear}
                                  onChange={(val) =>
                                    handleChangeExperience(exp.id, "endYear", val)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label>{descriptionLabel}</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <textarea
                                className="size-lg"
                                placeholder="Some details here..."
                                value={exp.description}
                                onChange={(e) =>
                                  handleChangeExperience(exp.id, "description", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {resumeDetails.experiences.length > 1 && (
                          <button
                            className="dash-cancel-btn"
                            onClick={() => handleRemoveExperience(exp.id)}
                          >
                            {removeExperienceText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="dash-btn-one" onClick={handleAddExperience}>
              <i className="bi bi-plus"></i> {addMoreText}
            </button>
          </div>


        {/* <DashboardPortfolio /> */}

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            className="dash-btn-two tran3s me-3"
            onClick={handleSaveAll}
            disabled={saving}
          >
            {saving ? savingText : saveText}
          </button>
          <button className="dash-cancel-btn tran3s" onClick={handleCancel} disabled={saving}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>

    {/* video modal start */}
    {/* <VideoPopup isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'-6ZbrfSRWKc'} /> */}
    {/* video modal end */}
    </>
  );
};

export default DashboardResume;