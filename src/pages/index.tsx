import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import PostList from "../components/PostList";
import { Post } from "../utils/types";

export default function Home({
  data,
}: {
  data: {
    allPost: { edges: [{ node: Post }] };
  };
}) {
  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <PostList posts={data.allPost.edges} />
      </main>
    </Layout>
  );
}

export const query = graphql`
  query {
    allPost(sort: { fields: publish_at, order: DESC }) {
      edges {
        node {
          ...postFields
        }
      }
    }
  }
`;
