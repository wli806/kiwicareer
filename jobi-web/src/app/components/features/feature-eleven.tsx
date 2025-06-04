"use client"
import React, { useState } from 'react';
import AccordionItem from '../accordion/accordion-item';
// import VideoPopup from '../common/video-popup';
import CounterOne from '../counter/counter-one';
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const FeatureEleven = () => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  const careerJourneyTitle = useLocalizedContent(
    "Empowering Your Career Journey",
    "赋能您的职业旅程"
  );

  const whoWeAreTitle = "Who we are?";
  const whoWeAreTitle_zh = "我们是谁？";
  const whoWeAreDesc =
    "We are a forward-thinking startup dedicated to connecting job seekers with the right opportunities. Whether you prefer our smart matching system or applying directly, we have you covered.";
  const whoWeAreDesc_zh =
    "我们是一家前瞻性的初创企业，致力于将求职者与合适的机会连接起来。无论您更喜欢我们的智能匹配系统还是直接申请，我们都能满足您的需求。";

  const whatOurGoalTitle = "What’s our goal";
  const whatOurGoalTitle_zh = "我们的目标是什么";
  const whatOurGoalDesc =
    "Our platform gives you full control: upload your resume for automated job matches, or explore company-specific openings and apply directly. We aim to simplify and empower your career journey.";
  const whatOurGoalDesc_zh =
    "我们的平台让您完全掌控：上传简历由我们自动帮您申请合适的职位，或直接浏览公司专属职位并申请。我们的目标是简化流程，助力您的职业发展。";

  const ourVisionTitle = "Our vision";
  const ourVisionTitle_zh = "我们的愿景";
  const ourVisionDesc =
    "We envision a future where every job seeker can easily discover and secure roles that match their unique talents, with the flexibility to choose between automated recommendations and direct applications.";
  const ourVisionDesc_zh =
    "我们期待未来每位求职者都能轻松发现并获得与其独特才能匹配的职位，同时拥有在自动申请与直接申请之间灵活选择的自由。";


  return (
    <>
    <section className="text-feature-three position-relative pt-100 lg-pt-80 md-pt-50">
      <div className="container">
        <div className="row">
          <div className="col-xxl-11 m-auto">
            <div className="row">
              <div className="col-lg-5">
                <div className="title-one mt-30 md-mb-40">
                  <h2 className="fw-500">{careerJourneyTitle}</h2>
                </div>
              </div>
              <div className="col-lg-6 ms-auto">
                <div className="wow fadeInRight">
                  <div className="accordion accordion-style-one color-two ps-xxl-5 ms-xxl-4" id="accordionOne">
                    <AccordionItem
                      id="one"
                      isShow={true}
                      title={whoWeAreTitle}
                      title_zh={whoWeAreTitle_zh}
                      desc={whoWeAreDesc}
                      desc_zh={whoWeAreDesc_zh}
                      parent="accordionOne"
                    />
                    <AccordionItem
                      id="two"
                      title={whatOurGoalTitle}
                      title_zh={whatOurGoalTitle_zh}
                      desc={whatOurGoalDesc}
                      desc_zh={whatOurGoalDesc_zh}
                      parent="accordionOne"
                    />
                    <AccordionItem
                      id="three"
                      title={ourVisionTitle}
                      title_zh={ourVisionTitle_zh}
                      desc={ourVisionDesc}
                      desc_zh={ourVisionDesc_zh}
                      parent="accordionOne"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="video-post d-flex align-items-center justify-content-center mt-100 lg-mt-50 mb-50 lg-mb-30">
              <a onClick={() => setIsVideoOpen(true)} className="fancybox rounded-circle video-icon tran3s text-center cursor-pointer">
                <i className="bi bi-play"></i>
              </a>
            </div> */}
            <div className="border-bottom pb-50 lg-pb-10">
              <div className="row">
                {/* counter */}
                <CounterOne style_3={true} />
                {/* counter */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        {/* video modal start */}
        {/* <VideoPopup isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'-6ZbrfSRWKc'} /> */}
      {/* video modal end */}
    </>
  );
};

export default FeatureEleven;