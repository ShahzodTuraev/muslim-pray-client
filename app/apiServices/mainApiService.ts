import axios from "axios";
import { serverApi } from "../lib/config";
import { getCookies } from "../lib/cookiesSetting";
import {
  DeletePrayerTime,
  PrayerTimeData,
  SavePrayerTime,
} from "../types/prayType";
class MainApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async prayerTimeRequest(): Promise<PrayerTimeData[] | undefined> {
    try {
      const result = await axios.get(this.path + "/prayer-time", {
        withCredentials: true,
        headers: await getCookies(),
      });
      return result.data;
    } catch (error) {
      console.log("Error::: RegisterRequest", error);
      throw error;
    }
  }
  public async savePrayerTime(
    prayerTime: "01" | "02" | "03" | "04" | "05"
  ): Promise<SavePrayerTime | undefined> {
    try {
      const result = await axios.post(
        this.path + "/required-tasks/create",
        { req_task_code: prayerTime },
        {
          withCredentials: true,
          headers: await getCookies(),
        }
      );
      return result.data;
    } catch (error) {
      console.log("Error::: rayerTimeRequest", error);
    }
  }
  public async deletePrayerTime(
    prayerId: string
  ): Promise<DeletePrayerTime | undefined> {
    try {
      const result = await axios.delete(
        this.path + `/required-tasks/delete/${prayerId}`,
        {
          withCredentials: true,
          headers: await getCookies(),
        }
      );
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("Delete prayerTime error:::", error);
    }
  }
}
export default MainApiService;
