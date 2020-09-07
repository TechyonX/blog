import React from "react";
import Layout from "../components/Layout";
import { FluidObject } from "gatsby-image";
import { graphql } from "gatsby";
import PostCard from "../components/PostCard";

type Post = {
  id: number;
  strapiId: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: [{ id: number; slug: string; name: string }];
  author: { id: number; username: string; email: string; full_name: string };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

type Tag = {
  strapiId: number;
  slug: string;
  name: string;
};

export default function Tag({
  data,
}: {
  data: {
    strapiTag: Tag;
    allStrapiPost: {
      edges: [{ node: Post }];
    };
  };
}) {
  return (
    <Layout seoProps={{ title: `${data.strapiTag.name}` }}>
      <main className="grid-container">
        <h2>{data.strapiTag.name}</h2>
        <p>{data.allStrapiPost.edges.length} НИЙТЛЭЛ</p>
        <div className="grid-x grid-margin-x grid-margin-y">
          {data.allStrapiPost.edges.map((post: { node: Post }) => {
            return <PostCard post={post.node} key={post.node.strapiId} />;
          })}
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query tagAndPost($slug: String!) {
    allStrapiPost(
      sort: { fields: publish_at, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          strapiId
          title
          slug
          excerpt
          tags {
            slug
            name
            id
          }
          author {
            username
            id
            email
            full_name
          }
          image {
            childImageSharp {
              fluid(maxWidth: 480) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    strapiTag(slug: { eq: $slug }) {
      name
      slug
      strapiId
    }
  }
`;
