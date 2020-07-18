import React from "react";
import { Link, Meta, Title } from "react-head";
import favicon from "../assets/images/white.png";
import special from "../assets/images/special.png";

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

export default function Seo({ type, title = "Блог", image, desc }: SeoProps) {
  return (
    <>
      <Title>TechyonX - {title}</Title>
      <Meta name="description" content={desc} />
      <Meta name="theme-color" content="#000000" />
      <Link rel="icon" type="image/png" sizes="16x16" href={favicon} />
      <Meta property="og:type" content={type || "website"} />
      <Meta property="og:title" content={title} />
      <Meta
        property="og:description"
        content={desc || "Шинжлэх ухаан, технологийн блог."}
      />
      <Meta property="og:url" content="https://techyonx.com/" />
      <Meta property="og:image" content={image?.url || special} />
      <Meta property="og:image:width" content={`${image?.width || 460}`} />
      <Meta property="og:image:height" content={`${image?.height || 460}`} />
    </>
  );
}
