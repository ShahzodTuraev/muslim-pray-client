import Swal from "sweetalert2";

export function successAlert(text: string) {
  Swal.fire({
    icon: "success",
    text,
    showConfirmButton: false,
    timer: 1500,
  });
  return;
}
export function errorAlert(text: string) {
  Swal.fire({
    icon: "error",
    text,
    showConfirmButton: false,
    timer: 1500,
  });
  return;
}
