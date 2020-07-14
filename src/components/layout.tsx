import React from "react";
import "./layout.scss";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}

export default Layout;
