"use client";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";

export default function OtpComfirm() {
  const [otp, setOtp] = useState<string>("");
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  console.log(otp);
  const validateChar = (value: string) => {
    return Number.isInteger(+value);
  };
  return (
    <div className="main ">
      <div className="otp-wrapper">
        <header className="mb-8 mt-60">
          <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your email.
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
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 mt-15"
        >
          Verify
        </button>
        <p className="mt-10 text-center text-m/6 text-gray-500">
          {`Didn't receive code? `}
          <span className="text-blue-600">Resend</span>
        </p>
      </div>
    </div>
  );
}
