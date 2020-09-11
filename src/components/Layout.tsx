import React from "react";
import { Link } from "gatsby";
import Seo, { SeoProps } from "./Seo";

import logo from "../assets/images/black.png";
import style from "./Layout.module.scss";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  seoProps?: SeoProps;
}

function Header() {
  return (
    <header className={`grid-y align-center ${style.headerContent}`}>
      <Link to={`/`}>
        <img src={logo} className={style.headerLogo} alt="TechyonX logo" />
      </Link>
      <p className={style.siteDescription}>Шинжлэх ухаан, технологийн блог.</p>
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
