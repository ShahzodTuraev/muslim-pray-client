"use server";

import { cookies } from "next/headers";

export async function setCookies(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", token, {
    httpOnly: false,
    maxAge: 3600 * 24 * 180,
  });
  return true;
}
export async function getCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  return token
    ? { Authorization: `Bearer ${token?.value}` }
    : { Authorization: `Bearer` };
}
export async function deleteCookies() {
  (await cookies()).set("access_token", "", { maxAge: 0 });
}
