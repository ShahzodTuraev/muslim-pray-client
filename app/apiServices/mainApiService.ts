import axios from "axios";
import { serverApi } from "../lib/config";
import { cookies } from "next/headers";

class MainApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    return token
      ? { Authorization: `Bearer ${token}` }
      : { Authorization: `Bearer` };
  }
  public async prayerTimeRequest() {
    try {
      const result = await axios.get(this.path + "/prayer-time", {
        withCredentials: true,
        headers: await this.getToken(),
      });
      console.log(result);
      return result.data;
    } catch (error) {
      console.log("Error::: RegisterRequest", error);
    }
  }
}
export default MainApiService;
