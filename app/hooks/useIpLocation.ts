"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const fetchIP = async () => {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_IP_API || "");
  return data;
};
const useIpLocation = () => {
  return useQuery({
    queryKey: ["fetchip"],
    queryFn: fetchIP,
  });
};
export default useIpLocation;
