"use client";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { UserCredential } from "../types/registerType";
import useIpLocation from "../hooks/useIpLocation";
import MemberApiService from "../apiServices/memberApiService";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { setCookies } from "../lib/cookiesSetting";
export default function OtpComfirm({
  setShowOtp,
  inputValue,
}: {
  inputValue: UserCredential;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  const validateChar = (value: string) => {
    return Number.isInteger(+value);
  };
  const { data } = useIpLocation();

  const onRegisterHanler = async () => {
    try {
      const registerData = {
        user_name: inputValue.user_name || "",
        user_email: inputValue.user_email || "",
        user_password: inputValue.user_password?.toString() || "",
        otp,
        country: data.country_name || "",
        city: data.city || "",
        latitude: Number(data.latitude || 0),
        longitude: Number(data.longitude || 0),
      };
      const mbApiService = new MemberApiService();
      const result = await mbApiService.registerRequest(registerData);
      if (result?.isOtpCorrect && !!result?.access_token) {
        Swal.fire({
          icon: "success",
          text: "Your are successfully registered",
          showConfirmButton: false,
          timer: 1500,
        });
        setCookies(result?.access_token);
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          text: "OTP is not correct!",
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log("onRegisterHanlerError:", err);
      throw err;
    }
  };
  const getOtpHandler = async () => {
    try {
      const mbApiService = new MemberApiService();
      await mbApiService.getOtp(inputValue.user_email || "");
    } catch (err) {
      console.log("getOtpHandlerError::", err);
    }
  };
  return (
    <div className="main ">
      <div className="otp-wrapper">
        <header className="mb-8 mt-60">
          <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your email:{" "}
            <b>{inputValue.user_email}</b>.
          </p>
        </header>
        <MuiOtpInput
          validateChar={validateChar}
          value={otp}
          onChange={handleChange}
          length={6}
          autoFocus
        />
        <button
          onClick={onRegisterHanler}
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 mt-15"
        >
          Verify
        </button>
        <p className="mt-10 text-center text-m/6 text-gray-500">
          {`Didn't receive code? `}
          <span onClick={getOtpHandler} className="text-blue-600">
            Resend
          </span>
        </p>
        <button onClick={() => setShowOtp(false)} className="text-blue-600">
          Go back
        </button>
      </div>
    </div>
  );
}
