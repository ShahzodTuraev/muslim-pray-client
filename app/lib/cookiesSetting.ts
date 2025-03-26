"use server";

import { cookies } from "next/headers";

export async function setCookies(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", token, {
    httpOnly: false,
    maxAge: 60 * 60,
  });
  return true;
}
export async function deleteCookies() {
  (await cookies()).set("access_token", "", { maxAge: 0 });
}
