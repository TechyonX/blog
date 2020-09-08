import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import PostList from "../components/PostList";
import { Post, Tag as TagType } from "../utils/types";

export default function Tag({
  data,
}: {
  data: {
    strapiTag: TagType;
    allPost: { edges: [{ node: Post }] };
  };
}) {
  return (
    <Layout seoProps={{ title: `${data.strapiTag.name}` }}>
      <main className="grid-container">
        <h2>{data.strapiTag.name}</h2>
        <p>{data.allPost.edges.length} НИЙТЛЭЛ</p>
        <PostList posts={data.allPost.edges} />
      </main>
    </Layout>
  );
}

export const query = graphql`
  query tagAndPost($slug: String!) {
    allPost(
      sort: { fields: publish_at, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
    strapiTag(slug: { eq: $slug }) {
      ...tagFields
    }
  }
`;
