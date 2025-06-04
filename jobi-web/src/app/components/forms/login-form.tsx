"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import { ILoginFormData, loginUser } from "@/redux/features/authThunk";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from "next/navigation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// // schema
// const schema = Yup.object().shape({
//   email: Yup.string().required("Email is required").email("Invalid email format"),
//   password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
// });

// // resolver
// const resolver: Resolver<ILoginFormData> = async (values) => {
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

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  // const loading = useAppSelector((state) => state.auth.loading);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const emailLabel = useLocalizedContent("Email*", "邮箱*");
  const emailPlaceholder = useLocalizedContent("james@example.com", "james@example.com");
  const passwordLabel = useLocalizedContent("Password*", "密码*");
  const passwordPlaceholder = useLocalizedContent("Enter Password", "请输入密码");
  const rememberLabel = useLocalizedContent("Keep me logged in", "保持登录状态");
  const submitButtonText = useLocalizedContent("Login", "登录");
  const loadingButtonText = useLocalizedContent("Please wait...", "请稍候...");

  // 验证消息本地化
  const emailRequiredMsg = useLocalizedContent("Email is required", "邮箱不能为空");
  const invalidEmailMsg = useLocalizedContent("Invalid email format", "邮箱格式不正确");
  const passwordRequiredMsg = useLocalizedContent("Password is required", "密码不能为空");
  const passwordMinMsg = useLocalizedContent("Password must be at least 6 characters", "密码至少需要6个字符");

  const schema = Yup.object().shape({
    email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
    password: Yup.string().required(passwordRequiredMsg).min(6, passwordMinMsg),
  });

  const resolver: Resolver<ILoginFormData> = async (values) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({ resolver });

  const onSubmit = async (data: ILoginFormData) => {
    try {
      setLoading(true)
      await dispatch(loginUser({ ...data, rememberMe: data.remember_me })).unwrap();
      const closeButton = document.getElementById("closeLoginModalButton");
      if (closeButton) {
        closeButton.click();
      }

      if (window.location.pathname.includes("/register")) {
        router.replace("/job-grid-v2");
      } else {
        router.refresh();
      }
    } catch (error: any) {

    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="row">
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
                <Image src={icon} alt="icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" {...register("remember_me")} />
              <label htmlFor="remember">{rememberLabel}</label>
            </div>
            {/* <a href="#">Forget Password?</a> */}
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className={`btn-eleven fw-500 tran3s d-block mt-20 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? loadingButtonText : submitButtonText}
          </button>
        </div>
        <a
          id="closeLoginModalButton"
          href="#"
          className="d-none"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></a>
      </div>
    </form>
  );
};

export default LoginForm;
