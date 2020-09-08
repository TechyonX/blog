import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import PostList from "../components/PostList";
import { Post, Author as AuthorType } from "../utils/types";

export default function Author({
  data,
}: {
  data: {
    allPost: { edges: [{ node: Post }] };
    strapiUser: AuthorType;
  };
}) {
  return (
    <Layout
      seoProps={{
        title: `${
          data.strapiUser.full_name
            ? data.strapiUser.full_name
            : data.strapiUser.username
        }`,
      }}
    >
      <main className="grid-container">
        <h2>
          {data.strapiUser.full_name
            ? data.strapiUser.full_name
            : data.strapiUser.username}
        </h2>
        <p>{data.allPost.edges.length} НИЙТЛЭЛ</p>
        <PostList posts={data.allPost.edges} />
      </main>
    </Layout>
  );
}

export const query = graphql`
  query authorAndPost($username: String!) {
    allPost(
      sort: { fields: publish_at, order: DESC }
      filter: { author: { username: { eq: $username } } }
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
    strapiUser(username: { eq: $username }) {
      ...userFields
    }
  }
`;
