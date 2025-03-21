"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/mainPage.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
export default function MainPage() {
  const slideList: number[] = [1, 2, 3];
  const router = useRouter();
  return (
    <div className="main main-page">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper swiper-container"
      >
        {" "}
        {slideList.map((ele, index) => {
          return (
            <SwiperSlide key={index} className="swiper-unit">
              <div className="img-wrapper">
                <Image
                  src="/images/prayer1.avif"
                  style={{ objectFit: "contain" }}
                  fill
                  alt="prayerimg"
                />
              </div>
              <p>page</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="btn-box">
        <Button variant="contained" onClick={() => router.push("/pages/login")}>
          Login
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push("/pages/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
