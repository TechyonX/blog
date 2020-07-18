import React from "react";
import Seo, { SeoProps } from "./seo";

import logo from "../assets/images/black.png";
import style from "./layout.module.scss";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  seoProps?: SeoProps;
}

function Header() {
  return (
    <header className="cell">
      <img src={logo} height="40px" width="auto" alt="TechyonX logo" />
    </header>
  );
}

function Footer() {
  return <footer className="cell">2020 TechyonX</footer>;
}

function Layout({ children, seoProps }: LayoutProps) {
  return (
    <div className={`grid-y ${style.content}`}>
      <Seo {...seoProps} />
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
}

export default Layout;
