import React from "react";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <h1>Hello TechyonX!</h1>
      <div className="grid-x">
        <div className="cell">full width cell</div>
        <div className="cell">full width cell</div>
      </div>
      <div className="grid-x">
        <div className="cell small-6">6 cells</div>
        <div className="cell small-6">6 cells</div>
      </div>
      <div className="grid-x">
        <div className="cell medium-6 large-4">12/6/4 cells</div>
        <div className="cell medium-6 large-8">12/6/8 cells</div>
      </div>
    </Layout>
  );
}
