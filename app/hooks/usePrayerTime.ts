"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const fetchTime = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_PRAYER_API}/19-03-2025?address=Seoul,SouthKorea&method=1&school=1`
  );
  return data;
};
const usePrayerTime = () => {
  return useQuery({
    queryKey: ["fetchtime"],
    queryFn: fetchTime,
    staleTime: 1000 * 60 * 5,
  });
};
export default usePrayerTime;
