import {
  LoginData,
  OtpData,
  RegisterData,
  RegisterReturn,
} from "./../types/memberType";
import axios from "axios";
import { serverApi } from "../lib/config";

class MemberApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  public async loginRequest(
    login_data: LoginData
  ): Promise<RegisterReturn | undefined> {
    try {
      const result = await axios.post(this.path + "/auth/sign-in", login_data, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      console.log("Error::: LoginRequest", error);
    }
  }
  public async registerRequest(
    register_data: RegisterData
  ): Promise<RegisterReturn | undefined> {
    try {
      const result = await axios.post(
        this.path + "/auth/sign-up",
        register_data,
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.log("Error::: RegisterRequest", error);
    }
  }
  public async getOtp(email: string): Promise<OtpData | undefined> {
    try {
      const result = await axios.post(
        this.path + "/otp",
        { email },
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      console.log("Error::: OtpRequest", error);
    }
  }
}
export default MemberApiService;
