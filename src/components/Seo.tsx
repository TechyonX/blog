import React from "react";
import { Link, Meta, Title } from "react-head";
import favicon from "../assets/images/logo-circle-light.png";
import special from "../assets/images/logo-special.png";
import { useLocation } from "@reach/router";

export interface SeoProps {
  type?: "website" | "article";
  title?: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
  desc?: string;
}

export default function Seo({
  type = "website",
  title = "Блог",
  image,
  desc = "Шинжлэх ухаан, технологийн блог.",
}: SeoProps) {
  const location = useLocation();
  return (
    <>
      <Title>{title} - TechyonX</Title>
      <Meta name="description" content={desc} />
      <Meta name="theme-color" content="#222222" />
      <Link rel="icon" type="image/png" sizes="16x16" href={favicon} />
      <Meta property="og:title" content={`${title} - TechyonX`} />
      <Meta property="og:type" content={type} />
      <Meta
        property="og:description"
        content={desc !== null ? desc : "Шинжлэх ухаан, технологийн блог."}
      />
      <Meta property="og:url" content={location.href} />
      <Meta
        property="og:image"
        content={"https://techyonx.com" + (image?.url || special)}
      />
      <Meta property="og:image:alt" content={title} />
      <Meta property="og:image:width" content={`${image?.width || 460}`} />
      <Meta property="og:image:height" content={`${image?.height || 460}`} />
    </>
  );
}
