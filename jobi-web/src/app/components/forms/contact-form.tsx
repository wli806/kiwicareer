"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import axios from "@/utils/axios";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

type IFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required.").label("Name"),
  email: Yup.string().required("Email is required.").email("Invalid email.").label("Email"),
  subject: Yup.string().label("Subject"),
  message: Yup.string().required("Message is required.").label("Message"),
});

const resolver: Resolver<IFormData> = async (values) => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { values, errors: {} };
  } catch (err: any) {
    const errors = err.inner.reduce((allErrors: any, currentError: any) => {
      return {
        ...allErrors,
        [currentError.path]: {
          type: currentError.type ?? "validation",
          message: currentError.message,
        },
      };
    }, {});
    return { values: {}, errors };
  }
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });

  const [loading, setLoading] = useState<boolean>(false);

  const nameLabel = useLocalizedContent("Name*", "姓名*");
  const namePlaceholder = useLocalizedContent("Your Name*", "您的姓名*");

  const emailLabel = useLocalizedContent("Email*", "邮箱*");
  const emailPlaceholder = useLocalizedContent("Email Address*", "电子邮箱*");

  const subjectLabel = useLocalizedContent("Subject (optional)", "主题（可选）");
  const subjectPlaceholder = useLocalizedContent("Write about the subject here...", "请输入主题");

  const messageLabel = useLocalizedContent("Message*", "消息*");
  const messagePlaceholder = useLocalizedContent("Your message*", "您的消息*");

  const submitButtonText = useLocalizedContent("Send Message", "发送消息");
  const sendingButtonText = useLocalizedContent("Sending...", "发送中...");

  const successText = useLocalizedContent(
    "Your message was sent successfully!",
    "您的消息已成功发送！"
  );
  const failText = useLocalizedContent(
    "Failed to send your message.",
    "发送消息失败。"
  );


  const onSubmit = async (data: IFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/common/contact`, data);
      notifySuccess(response.data.message || successText);
      reset();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || failText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="messages"></div>
      <div className="row controls">
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="name">{nameLabel}</label>
            <input
              type="text"
              placeholder={namePlaceholder}
              {...register("name")}
              name="name"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.name?.message || ""} />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="email">{emailLabel}</label>
            <input
              type="email"
              placeholder={emailPlaceholder}
              {...register("email")}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message || ""} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <label htmlFor="subject">{subjectLabel}</label>
            <input
              {...register("subject")}
              type="text"
              placeholder={subjectPlaceholder}
              name="subject"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <label htmlFor="message">{messageLabel}</label>
            <textarea
              placeholder={messagePlaceholder}
              {...register("message")}
              name="message"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.message?.message || ""} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn-eleven fw-500 tran3s d-block" type="submit" disabled={loading}>
           {loading ? sendingButtonText : submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
