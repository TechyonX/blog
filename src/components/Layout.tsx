import React from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import Seo, { SeoProps } from "./Seo";
import style from "./Layout.module.scss";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  seoProps?: SeoProps;
}

function Header() {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "black.png" }) {
            childImageSharp {
              fixed(width: 96, height: 96) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={(data: { file: { childImageSharp: { fixed: FixedObject } } }) => (
        <header className={`grid-y align-center ${style.headerContent}`}>
          <Link to={`/`}>
            <Img
              className={style.headerLogo}
              fixed={data.file.childImageSharp.fixed}
              alt="TechyonX logo"
            />
          </Link>
          <p className={style.siteDescription}>
            Шинжлэх ухаан, технологийн блог.
          </p>
        </header>
      )}
    />
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
