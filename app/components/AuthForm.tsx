"use client";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import OtpComfirm from "./OtpInput";
import MemberApiService from "../apiServices/memberApiService";
import { setCookies } from "../lib/cookiesSetting";
import { errorAlert, successAlert } from "../lib/alertSettings";
import { useRouter } from "next/navigation";
const AuthForm = ({ type }: { type: string }) => {
  // INITIALIZATIONS:
  const router = useRouter();
  const [inputVal, setInputVal] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    repassword: "",
  });

  const [showOtp, setShowOtp] = useState<boolean>(false);
  // HANDLERS:
  const getOtpHandler = async () => {
    try {
      const mbApiService = new MemberApiService();
      await mbApiService.getOtp(inputVal.user_email || "");
    } catch (err) {
      console.log("getOtpHandlerError::", err);
    }
  };
  const onSubmitHandler = async () => {
    if (type === "Register") {
      const userSchema = z.object({
        user_name: z.string().min(1, "Name is required"), // Not null and must be a string
        user_email: z
          .string()
          .min(1, "Email is required")
          .email("Invalid email"), // Must be a valid email
        user_password: z.string().min(6, "Password is required"), // Not null and must be a string
      });
      const parsObj = {
        user_name: inputVal.user_name,
        user_email: inputVal.user_email,
        user_password: inputVal.user_password,
      };

      const result = userSchema.safeParse(parsObj);
      if (result?.success && inputVal.user_password == inputVal.repassword) {
        getOtpHandler();
        setShowOtp(true);
      } else {
        let error = "Something went wrong!";
        if (inputVal.user_name.length == 0) {
          error = "Fullname is required";
        }
        if (inputVal.user_email.length == 0) {
          error = "Correct email is required";
        }
        if (inputVal.user_password.length < 6) {
          error = "Password must contain at least 6 characters";
        }
        if (inputVal.repassword !== inputVal.user_password) {
          error = "Paswords do not match";
        }
        errorAlert(error);
      }
    }
    if (type === "Login") {
      const loginApiService = new MemberApiService();
      const result = await loginApiService.loginRequest({
        user_email: inputVal.user_email,
        user_password: inputVal.user_password,
      });
      if (result) {
        setCookies(result?.access_token || "");
        successAlert("Login Successful");
        router.push("/");
      } else {
        errorAlert("Email or password is not correct");
      }
      console.log("result::::", result);
    }
  };

  return (
    <>
      {!showOtp ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              {type == "Register"
                ? "Create your account"
                : "Log in to your account"}
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              {type == "Register" && (
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-base/2 font-medium text-gray-900"
                  >
                    Fullname
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      required
                      onChange={(e) =>
                        setInputVal({
                          ...inputVal,
                          user_name: e?.target?.value,
                        })
                      }
                      value={inputVal.user_name}
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-base/6"
                    />
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="user_e"
                  className="block text-base/2 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="user_de"
                    id="user_e"
                    type="text"
                    onChange={(e) =>
                      setInputVal({ ...inputVal, user_email: e?.target?.value })
                    }
                    value={inputVal.user_email}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-base/6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password1"
                    className="block text-base/2 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password1"
                    name="password1"
                    type="password"
                    onChange={(e) =>
                      setInputVal({
                        ...inputVal,
                        user_password: e?.target?.value,
                      })
                    }
                    value={inputVal.user_password}
                    required
                    autoComplete="off"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-base/6"
                  />
                </div>
              </div>
              {type == "Register" && (
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-base/2 font-medium text-gray-900"
                    >
                      Comfirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      onChange={(e) =>
                        setInputVal({
                          ...inputVal,
                          repassword: e?.target?.value,
                        })
                      }
                      value={inputVal.repassword}
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-base/6"
                    />
                  </div>
                </div>
              )}
              <div>
                <button
                  onClick={onSubmitHandler}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-base/8 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  {type}
                </button>
                <br />
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                  {type == "Register"
                    ? "Already have an account?"
                    : `Don't have an account?`}{" "}
                  <Link
                    href={
                      type == "Register" ? "/pages/login" : "/pages/register"
                    }
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    {type == "Register" ? "Login" : "Register"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OtpComfirm setShowOtp={setShowOtp} inputValue={inputVal} />
      )}
    </>
  );
};

export default AuthForm;
