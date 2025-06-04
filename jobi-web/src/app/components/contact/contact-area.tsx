"use client";
import React from "react";
import Image from "next/image";
import icon_1 from '@/assets/images/icon/icon_57.svg';
import icon_2 from '@/assets/images/icon/icon_58.svg';
import icon_3 from '@/assets/images/icon/icon_59.svg';
import ContactForm from "../forms/contact-form";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const ContactArea = () => {
  const titleText = useLocalizedContent("Get in touch", "联系我们");
  const addressTitle = useLocalizedContent("Our Address", "我们的地址");
  const contactInfoTitle = useLocalizedContent("Contact Info", "联系方式");
  const supportTitle = useLocalizedContent("Support", "支持服务");

  const contactInfoDesc = useLocalizedContent(
    "Open a chat or give us call at",
    "开启聊天或拨打电话联系我们"
  );
  const supportDesc = useLocalizedContent(
    "Feel free to leave us a message below or email us at",
    "欢迎在下方留言或发送邮件至"
  );

  return (
    <section className="contact-us-section pt-100 lg-pt-80">
      <div className="container">
        <div className="border-bottom pb-150 lg-pb-80">
          <div className="title-one text-center mb-70 lg-mb-40">
            <h2>{titleText}</h2>
          </div>
          <div className="row">
            <div className="col-xl-10 m-auto">
              <div className="row">
                <div className="col-md-4">
                  <div className="address-block-one text-center mb-40 wow fadeInUp">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <Image src={icon_1} alt="icon" />
                    </div>
                    <h5 className="title">{addressTitle}</h5>
                    <p>
                      Suit 102, Pakuranga Plaza Tower, <br />
                      10 Aylesbury Street, Pakuranga 2010, <br />
                      Auckland, New Zealand
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-block-one text-center mb-40 wow fadeInUp">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <Image src={icon_2} alt="icon" />
                    </div>
                    <h5 className="title">{contactInfoTitle}</h5>
                    <p>
                      {contactInfoDesc} <br />
                      <a href="tel:310.841.5500" className="call">
                        +64 210328885
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-block-one text-center mb-40 wow fadeInUp">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <Image src={icon_3} alt="icon" />
                    </div>
                    <h5 className="title">{supportTitle}</h5>
                    <p>
                     {supportDesc}&nbsp;
                      <a href="mailto:info@me2link.com" className="webaddress">
                        info@me2link.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-9 m-auto">
              <div className="form-style-one mt-85 lg-mt-50 wow fadeInUp">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
