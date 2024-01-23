import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sliceContent(content: string) {
  return content.length >= 70 ? `${content.slice(0, 70)}...` : content;
}
