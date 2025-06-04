"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import { IRegisterFormData, registerUser } from "@/redux/features/authThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// schema
// const schema = Yup.object().shape({
//   username: Yup.string().required("Username is required"),
//   email: Yup.string().required("Email is required").email("Invalid email format"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
//   confirmPassword: Yup.string()
//     .required("Confirm Password is required")
//     .oneOf([Yup.ref("password")], "Passwords must match"),
//   // role: Yup.string()
//   //   .oneOf(["candidate", "employer", "admin"], "Invalid role")
//   //   .required("Role is required"),
// });

// resolver
// const resolver: Resolver<Omit<IRegisterFormData, "confirmPassword"> & { confirmPassword: string }> = async (values) => {
//   const errors: Record<string, any> = {};
//   try {
//     await schema.validate(values, { abortEarly: false });
//   } catch (error: any) {
//     error.inner.forEach((err: any) => {
//       errors[err.path] = {
//         type: err.type,
//         message: err.message,
//       };
//     });
//   }
//   return { values: Object.keys(errors).length ? {} : values, errors };
// };

const RegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isAgreedError, setIsAgreedError] = useState<string | null>(null);
  // const loading = useAppSelector((state) => state.auth.loading);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const usernameLabel = useLocalizedContent("Username*", "用户名*");
  const usernamePlaceholder = useLocalizedContent("Your Username", "请输入用户名");

  const emailLabel = useLocalizedContent("Email*", "邮箱*");
  const emailPlaceholder = useLocalizedContent("Your Email Address", "请输入电子邮箱");

  const passwordLabel = useLocalizedContent("Password*", "密码*");
  const passwordPlaceholder = useLocalizedContent("Enter Password", "请输入密码");

  const confirmPasswordLabel = useLocalizedContent("Confirm Password*", "确认密码*");
  const confirmPasswordPlaceholder = useLocalizedContent("Re-enter Password", "请再次输入密码");

  const termsText = useLocalizedContent(
    "By hitting the Register button, you agree to the ",
    "点击注册按钮，即表示您同意 "
  );
  const termsLink1 = useLocalizedContent("Terms conditions", "服务条款");
  const termsLink2 = useLocalizedContent("Privacy Policy", "隐私政策");

  const registerButtonText = useLocalizedContent("Register", "注册");
  const loadingButtonText = useLocalizedContent("Please wait...", "请稍候...");

  // 本地化验证消息（注意：由于 Yup schema 需要在函数组件内部调用 Hook，所以这里直接在组件内定义）
  const usernameRequired = useLocalizedContent("Username is required", "用户名为必填项");
  const emailRequired = useLocalizedContent("Email is required", "邮箱为必填项");
  const invalidEmail = useLocalizedContent("Invalid email format", "邮箱格式不正确");
  const passwordRequired = useLocalizedContent("Password is required", "密码为必填项");
  const passwordMinLength = useLocalizedContent("Password must be at least 6 characters", "密码至少需要6个字符");
  const confirmPasswordRequired = useLocalizedContent("Confirm Password is required", "确认密码为必填项");
  const passwordsMustMatch = useLocalizedContent("Passwords must match", "两次密码输入必须一致");

  const agreeErrorText = useLocalizedContent(
    "You must agree to the terms and conditions before registering.",
    "注册前您必须同意服务条款和隐私政策。"
  );

  const schema = Yup.object().shape({
    username: Yup.string().required(usernameRequired).label("Username"),
    email: Yup.string().required(emailRequired).email(invalidEmail).label("Email"),
    password: Yup.string().required(passwordRequired).min(6, passwordMinLength).label("Password"),
    confirmPassword: Yup.string()
      .required(confirmPasswordRequired)
      .oneOf([Yup.ref("password")], passwordsMustMatch)
      .label("Confirm Password"),
  });

  const resolver: Resolver<Omit<IRegisterFormData, "confirmPassword"> & { confirmPassword: string }> = async (values) => {
    const errors: Record<string, any> = {};
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error: any) {
      error.inner.forEach((err: any) => {
        errors[err.path] = {
          type: err.type,
          message: err.message,
        };
      });
    }
    return { values: Object.keys(errors).length ? {} : values, errors };
  };

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<IRegisterFormData, "confirmPassword"> & { confirmPassword: string }>({ resolver });

  const onSubmit = async (data: IRegisterFormData) => {
    if (!isAgreed) {
      setIsAgreedError(agreeErrorText);
      return;
    }

    try {
      setLoading(true)
      await dispatch(registerUser(data)).unwrap();
      reset();
      setIsAgreed(false);
      setIsAgreedError(null);

      const loginTrigger = document.getElementById("loginModalTrigger");
      loginTrigger?.click();
    } catch (error: any) {

    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>{usernameLabel}</label>
            <input
              type="text"
              placeholder={usernamePlaceholder}
              {...register("username", { required: `Name is required!` })}
              name="username"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.username?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>{emailLabel}</label>
            <input
              type="email"
              placeholder={emailPlaceholder}
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>{passwordLabel}</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder={passwordPlaceholder}
              className="pass_log_id"
              {...register("password", { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>{confirmPasswordLabel}</label>
            <input
              type={`${showConfirmPass ? "text" : "password"}`}
              placeholder={confirmPasswordPlaceholder}
              {...register("confirmPassword")}
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              <span 
                className={`passVicon ${showConfirmPass ? "eye-slash" : ""}`}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                <Image src={icon} alt="confirm-pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.confirmPassword?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex flex-column">
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                id="terms"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  setIsAgreedError(null); // 清除错误状态
                }}
              />
              <label htmlFor="terms" className="ms-2">
                {termsText}{" "}
                <Link href="/terms">{termsLink1}</Link> &{" "}
                <Link href="/privacy">{termsLink2}</Link>.
              </label>
            </div>
            {isAgreedError && (
              <div className="help-block with-errors mt-2">
                <ErrorMsg msg={isAgreedError} />
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className={`btn-eleven fw-500 tran3s d-block mt-20 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? loadingButtonText : registerButtonText}
          </button>
        </div>
        <a
          id="loginModalTrigger"
          href="#"
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        ></a>
      </div>
    </form>
  );
};

export default RegisterForm;
