export interface OtpData {
  message: string;
}
export interface RegisterData {
  user_name: string;
  user_email: string;
  user_password: string;
  otp: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}
export interface LoginData {
  user_email: string;
  user_password: string;
}
export interface RegisterReturn {
  isOtpCorrect: boolean;
  access_token: string | null;
}
