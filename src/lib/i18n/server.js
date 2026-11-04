import "server-only";
import { cookies } from "next/headers";
import { createTranslator, normalizeLocale } from "./messages";
export async function getLocale() {
  return normalizeLocale((await cookies()).get("linkspace-locale")?.value);
}
export async function getTranslator() {
  return createTranslator(await getLocale());
}
