import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  created_at: Date;
  content: string;
  status: string;
};

export default function Post({ data }: { data: { strapiPost: Post } }) {
  return (
    <Layout>
      <main className="grid-container">
        <div className="grid-x">
          <div className="cell auto">
            <p>{data.strapiPost.created_at}</p>
            <h1>{data.strapiPost.title}</h1>
            <p>{data.strapiPost.content}</p>
            <p>{data.strapiPost.status}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  {
    strapiPost(slug: { eq: "turshilt" }) {
      strapiId
      title
      excerpt
      content
      status
      created_at(formatString: "YYYY-MM-DD")
    }
  }
`;
