import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

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
            <ReactMarkdown source={data.strapiPost.content} />
            <p>{data.strapiPost.status}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query Post($slug: String!) {
    strapiPost(slug: { eq: $slug }) {
      strapiId
      title
      excerpt
      content
      status
      created_at(formatString: "YYYY-MM-DD")
    }
  }
`;
