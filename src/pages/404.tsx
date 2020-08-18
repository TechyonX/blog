import React from "react";
import Layout from "../components/Layout";

export default function NotFound() {
  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <div className="cell shrink text-center">
          <h1>404!</h1>
          <p>Энд юу ч байхгүй</p>
        </div>
      </main>
    </Layout>
  );
}
