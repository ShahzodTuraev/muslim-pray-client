"use client";
import moment from "moment";
import "./styles/homePage.css";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MainDrawer from "./components/MainDrawer";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WeekStat from "./components/weekStat";
import MainApiService from "./apiServices/mainApiService";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading";
import { CircularProgress } from "@mui/material";

export default function HomePage() {
  // INITIALIZATIONS:
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [checkLoad, setCheckLoad] = useState("");
  // HANDLERS:
  const fetchData = async () => {
    const mainApi = new MainApiService();
    const data = await mainApi.prayerTimeRequest();
    return data;
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchtimer"],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });
  const onCheckHandler = async (
    code: "01" | "02" | "03" | "04" | "05",
    id: string | null
  ) => {
    try {
      const mainApiService = new MainApiService();
      setCheckLoad(code);
      if (!id) {
        await mainApiService.savePrayerTime(code);
      } else {
        await mainApiService.deletePrayerTime(id);
      }
      await refetch();
      setCheckLoad("");
    } catch (err) {
      throw err;
    }
  };
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="home-main">
          <div className="home-container">
            <div className="header">
              <div className="header-text-wrap">
                <p className="head"> Daily Prayer Times</p>
                <p className="head-location">
                  {" "}
                  <LocationOnIcon fontSize="small" /> Seoul, South Korea
                </p>
                <p>
                  <TodayIcon className="mr-1" />
                  {moment().format("MMMM DD, YYYY")}
                </p>
              </div>
              <div onClick={() => setDrawerOpen(true)} className="menu-cover">
                <MenuIcon fontSize="large" />
              </div>
            </div>
            <div className="list">
              {data?.map((ele) => {
                return (
                  <div key={ele?.id} className="item">
                    <div className="left-box">
                      <LightModeIcon />
                      <p className="title">{ele?.prayer}</p>
                      <p className="remain-time">
                        {ele?.id == "01" ? `(Sunrise: ${ele?.sunrise})` : ""}
                      </p>
                    </div>
                    <div className="right-box">
                      <p>{ele?.time}</p>
                      <button
                        onClick={() =>
                          onCheckHandler(
                            ele?.id,
                            ele?.checked ? ele?.checked : null
                          )
                        }
                      >
                        {ele?.id !== checkLoad ? (
                          <CheckCircleIcon
                            className={ele?.checked ? "active" : "passive"}
                          />
                        ) : (
                          <CircularProgress size={"20px"} color="success" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <WeekStat />
          </div>
          <MainDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </div>
      )}
    </>
  );
}
