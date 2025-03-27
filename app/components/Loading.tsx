import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <CircularProgress />
      <h2 className="mt-2">Loading...</h2>
    </div>
  );
}
