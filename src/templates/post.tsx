import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import ReactMarkdown from "react-markdown";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  created_at: Date;
  content: string;
  status: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export default function Post({ data }: { data: { strapiPost: Post } }) {
  return (
    <Layout>
      <main className="grid-container">
        <div className="grid-x">
          <div className="cell auto">
            <p>{data.strapiPost.created_at}</p>
            <h1>{data.strapiPost.title}</h1>
            {data.strapiPost.image ? (
              <Img fluid={data.strapiPost.image.childImageSharp.fluid} />
            ) : null}
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
      image {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      created_at(formatString: "YYYY-MM-DD")
    }
  }
`;
