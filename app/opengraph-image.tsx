import { ImageResponse } from "next/og";
import { OgImageTemplate, ogImageSize } from "@/lib/og-image-template";

export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgImageTemplate />, { ...size });
}
